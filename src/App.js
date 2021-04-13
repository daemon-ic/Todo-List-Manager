import React, { useState, useEffect } from "react";
import fire from "./Firebase";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Input from "./components/Input";
import ListDisplay from "./components/ListDisplay";
import AddDialog from "./components/AddDialog";
import DelDialog from "./components/DelDialog";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export const fetchedListDataContext = React.createContext();
export const pageContext = React.createContext();

var listsDB = fire.firestore().collection("Lists");

//--------------------------------------------------------------- CUSTOM HOOK

function useListData() {
  const [listItems, setListItems] = useState([]);
  const [initialPage, setInitialPage] = useState([]);

  useEffect(() => {
    const unsubscribe = listsDB.orderBy("timestamp").onSnapshot((snapshot) => {
      const retrievedListItems = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      setListItems(retrievedListItems);

      let pageList = [];
      Object.keys(retrievedListItems).forEach(function (key) {
        const obj = retrievedListItems[key];

        const data = Object.keys(obj);
        data.map((item) => {
          if (Object.keys(obj)) {
            if (item !== "timestamp") {
              pageList.push(item);
            }
          }
        });
      });

      if (pageList[0]) {
        setInitialPage(pageList);
      } else {
        const id = uuidv4();
        const timestamp = Date.now();
        listsDB.doc("Default List").set({
          "Default List": [],
          timestamp,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return { listItems, initialPage };
}

//--------------------------------------------------------------- CUSTOM HOOK
//--------------------------------------------------------------- MUI STYLING

const useStyles = makeStyles((theme) => ({
  smallBox: {
    width: "500px",
    height: "800px",
  },
  mainBox: {
    display: "flex",

    flexWrap: "wrap",

    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));
//--------------------------------------------------------------- MUI STYLING
//--------------------------------------------------------------- SETUP

function App() {
  const classes = useStyles();

  const fetchedListData = useListData().listItems;
  const pages = useListData().initialPage;

  const [pageIdx, setPageIdx] = useState(0);
  const currentPage = pages[pageIdx];

  let currentGroupContents = [];
  // here, im extracting the objects from fetched list, then getting the keys from those objects
  // one of those keys should be named after the current page, so i run through the array of keys
  // and compare it to the current page, if theres a match, i want that object saved to currentGroupContents
  // NEEDS TO BE UPDATED

  if (currentPage) {
    fetchedListData.map((obj) => {
      if (obj[currentPage]) {
        currentGroupContents = obj[currentPage];
      }
    });
  }

  // TODO : NEED TO MAKE CLEANUP FUNCTION THAT DELETES EVERY ITEM THAT DOESNT HAVE AN EXISTING CATEGORY

  //--------------------------------------------------------------- SETUP
  //--------------------------------------------------------------- FUNCTIONS

  const onPageCreation = () => {
    setPageIdx(pages.length);
  };

  const onPageDeletion = () => {
    listsDB.doc(currentPage).delete();
    if (pageIdx > 0) {
      setPageIdx(pageIdx - 1);
    }

    if (!currentGroupContents) {
    }
  };

  const pageUp = () => {
    if (pageIdx < pages.length - 1) {
      setPageIdx(pageIdx + 1);
    }
  };

  const pageDown = () => {
    if (pageIdx > 0) {
      setPageIdx(pageIdx - 1);
    }
  };

  //--------------------------------------------------------------- FUNCTIONS
  //--------------------------------------------------------------- RENDER

  return (
    <React.Fragment>
      {!fetchedListData && <h1>Loading</h1>}
      {fetchedListData && currentGroupContents && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#F2F3F7",
          }}
        >
          <div className={classes.mainBox}>
            <Paper
              style={{
                borderRadius: "20px",
                width: "600px",
                height: "550px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
              elevation={3}
            >
              <div
                style={{
                  color: "#3F51B5",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div>
                  {pageIdx > 0 ? (
                    <Button
                      style={{ marginRight: "10px" }}
                      color="primary"
                      onClick={pageDown}
                      disableElevation
                    >
                      <ArrowBackIosIcon color="primary" />
                    </Button>
                  ) : (
                    <Button
                      style={{ marginRight: "10px" }}
                      color="primary"
                      onClick={pageDown}
                      disableElevation
                    >
                      <ArrowBackIosIcon />
                    </Button>
                  )}

                  <Button color="primary" onClick={pageUp} disableElevation>
                    <ArrowForwardIosIcon color="primary" />
                  </Button>
                </div>

                <div>
                  <h1>{currentPage}</h1>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ marginRight: "10px" }}>
                    <AddDialog pages={pages} onPageCreation={onPageCreation} />
                  </div>
                  <DelDialog onPageDeletion={onPageDeletion} />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "start",
                  height: "500px",
                  width: "100%",
                  overflow: "scroll",
                }}
              >
                <ListDisplay
                  currentGroupContents={currentGroupContents}
                  currentPage={currentPage}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Input
                  currentGroupContents={currentGroupContents}
                  currentPage={currentPage}
                />
              </div>
              <div style={{ paddingBottom: "20px" }}>
                {pageIdx + 1} / {pages.length}
              </div>
            </Paper>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default App;
//--------------------------------------------------------------- RENDER
