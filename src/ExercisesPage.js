import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import Exercise from "./excercise";
import { Grid } from "@mui/material";
import AddExercise from "./AddExercise";
import Header from "./header";
import ReactLoading from "react-loading";

function ExercisesPage() {
  const [isReady, setIsReady] = React.useState(false);
  const prevCal = parseInt(localStorage.getItem("cb"));
  const [exercises, setExercises] = useState([]);
  const [burntCal, setBurntCal] = useState(prevCal);
  const [warn, setWarn] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let { data } = await axios({
      method: "get",
      url: `https://fitness-tracker-node-123.herokuapp.com/exercises`,
      headers: {
        "Content-Type": "application/json",
        "access-token": "Bearer " + `${localStorage.getItem("token")}`,
      },
    });
    setExercises(data);
    setIsReady(true);
  };

  if (refresh === true) {
    getData();
    setRefresh(false);
  }

  const submitCalCount = async () => {
    if (parseInt(localStorage.getItem("cb")) !== 0) {
      setWarn(false);
      let { data } = await axios({
        method: "get",
        url: `https://fitness-tracker-node-123.herokuapp.com/users/${localStorage.getItem(
          "id"
        )}`,
        headers: {
          "Content-Type": "application/json",
          "access-token": "Bearer " + `${localStorage.getItem("token")}`,
        },
      });
      let today = new Date().toISOString().slice(0, 10);
      // today = "2021-10-06";
      let BurntCalories = parseInt(localStorage.getItem("cb"));
      let dateAndCal = [{ date: today, burntCals: BurntCalories }];
      if (data.userStats) {
        if (data.userStats[data.userStats.length - 1].date === today) {
          dateAndCal = [...data.userStats];
          dateAndCal[dateAndCal.length - 1].burntCals =
            data.userStats[data.userStats.length - 1].burntCals +
            parseInt(localStorage.getItem("cb"));
          handleUpload(dateAndCal);
          localStorage.setItem("cb", "0");
          setBurntCal(0);
          // console.log("123");
        } else {
          let newData = [
            ...data.userStats,
            { date: today, burntCals: BurntCalories },
          ];
          handleNewUpload(newData);
          // console.log("456");
          localStorage.setItem("cb", "0");
          setBurntCal(0);
        }
      } else {
        handleUpload(dateAndCal);
        localStorage.setItem("cb", "0");
        setBurntCal(0);
      }
    } else {
      setWarn(true);
    }
  };

  const handleUpload = async (dateAndCal) => {
    const { data } = await axios({
      method: "put",
      url: `https://fitness-tracker-node-123.herokuapp.com/users/${localStorage.getItem(
        "id"
      )}`,
      headers: {
        "Content-Type": "application/json",
        "access-token": "Bearer " + `${localStorage.getItem("token")}`,
      },
      data: {
        userStats: dateAndCal,
      },
    });
    if (data.value.userStats) {
      let date = data.value.userStats.map((e) => {
        return e.date;
      });
      let Calories = data.value.userStats.map((e) => {
        return e.burntCals;
      });
      localStorage.setItem("date", JSON.stringify(date));
      localStorage.setItem("Calories", JSON.stringify(Calories));
    }
    // console.log(data.value);
  };

  const handleNewUpload = async (newData) => {
    const { data } = await axios({
      method: "put",
      url: `https://fitness-tracker-node-123.herokuapp.com/users/${localStorage.getItem(
        "id"
      )}`,
      headers: {
        "Content-Type": "application/json",
        "access-token": "Bearer " + `${localStorage.getItem("token")}`,
      },
      data: {
        userStats: newData,
      },
    });
    if (data.value.userStats) {
      let date = data.value.userStats.map((e) => {
        return e.date;
      });
      let Calories = data.value.userStats.map((e) => {
        return e.burntCals;
      });
      localStorage.setItem("date", JSON.stringify(date));
      localStorage.setItem("Calories", JSON.stringify(Calories));
    }
    // console.log(data.value);
  };

  return (
    <>
      <Header />
      <br />

      <Container className="justify-content-center">
        <h3>
          Calories burnt : {burntCal}{" "}
          <Button variant="success" onClick={submitCalCount}>
            Done for today
          </Button>
          {warn ? (
            <h4 className="danger">Do some exercise before hitting done</h4>
          ) : null}
        </h3>{" "}
        <AddExercise
          refreshAddExercise={(refresh) => {
            setRefresh(refresh);
          }}
        />
        <br />
        {isReady ? (
          <Grid
            container
            spacing={{ xs: 4, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <>
              {exercises.map((e, index) => (
                <Grid item key={index}>
                  <Exercise
                    id={e._id}
                    title={e.title}
                    cals={e.cals}
                    pic={e.pic}
                    ChangeBurntCal={(burntCal) => {
                      setBurntCal(burntCal);
                    }}
                    refreshAddExercise={(refresh) => {
                      setRefresh(refresh);
                    }}
                  />
                </Grid>
              ))}
            </>
          </Grid>
        ) : (
          <div className="d-flex justify-content-center">
            {" "}
            <ReactLoading
              type="spinningBubbles"
              color="#1877f2"
              height={"20%"}
              width={"20%"}
            />{" "}
          </div>
        )}
        <br />
      </Container>
    </>
  );
}

export default ExercisesPage;
