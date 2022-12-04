import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Avatar, CardHeader, CardMedia, Collapse, List, ListItem, ListItemText, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./findrecipes.css";
import { styled } from "@mui/material/styles";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { FormLabel, Rating } from "@mui/material";
import { green } from "@mui/material/colors";
import { FaThLarge } from "react-icons/fa";
import { CheckBox, Favorite, MoreVert, PictureAsPdf, Share } from "@mui/icons-material";
import Select from "@mui/material/Select";
import Time from "./findrecipestime";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Slider from '@mui/material/Slider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "white",
  },
  "& .MuiRating-iconHover": {
    color: "white",
  },
});

function FindRecipe(/** @type {{setToken,}}*/ props) {
  const defaultSearchFormState = {
    recipeName: "",
    time: 0,
    difficulty: 0,
    spice: 0,
    vegetarian: false,
    vegan: false,
    dairy: false,
    nut: false,
    gluten: false,
    // ingredients: "",
    // steps: "",
  };

  // state to hold recipes to show
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isRecipesLoaded, setRecipesLoaded] = useState(false);
  const [searchFormState, setSearchFormState] = useState(
    defaultSearchFormState
  );

  useEffect(() => {
    // get recipes from API
    if (isRecipesLoaded === false) {
      axios({
        method: "GET",
        url: "/recipes",
        headers: {
          Authorization: `Bearer  ${props.token}`,
        },
      })
        .then((response) => {
          setAllRecipes(response.data);
          setFilteredRecipes(allRecipes);
        })
        .then(() => {
          setRecipesLoaded(true);
        });
    }
  });

  const handleSearchInput = (e) => {
    // set search input on form state
    console.log("updating field", e.target.name, "with value", e.target.value, "tas");
    setSearchFormState({
      ...searchFormState,
      [e.target.name]: e.target.value,
      [e.target.tags]: e.target.tags,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("raw search form state", searchFormState);
    const userRecipeName = String(searchFormState.recipeName).toLowerCase();
    const userTimeToCook = Number(searchFormState.time);
    const userDifficulty = Number(searchFormState.difficulty);
    const userSpice = Number(searchFormState.spice);
    const userVegetarian = searchFormState.vegetarian;
    const userVegan = searchFormState.vegan;
    const userDairy = searchFormState.dairy;
    const userGluten = searchFormState.gluten;
    const userNut = searchFormState.nut;

    const hasDietaryRestrictions =
      userVegetarian || userVegan || userDairy || userGluten || userNut;

    const filterDecider = (recipe) => {
      const lowercaseRecipeName = recipe.name.toLowerCase();
      const lowercaseTags = recipe.tags.map((tag) => tag.toLowerCase());
      // filter name
      if (userRecipeName && !lowercaseRecipeName.includes(userRecipeName)) {
        return false;
      }
      // filter time
      if (userTimeToCook !== 0 && recipe.time > userTimeToCook) {
        return false;
      }

      // filter difficulty
      if (userDifficulty !== 0 && recipe.difficulty > userDifficulty) {
        return false;
      }

      // filter spice
      if (userSpice !== 0 && recipe.spiceLevel !== userSpice) {
        return false;
      }

      // filter tags
      if (hasDietaryRestrictions) {
        if (userVegetarian && !lowercaseTags.includes("vegetarian")) {
          return false;
        }
        if (userVegan && !lowercaseTags.includes("vegan")) {
          return false;
        }
        if (userDairy && !lowercaseTags.includes("dairy")) {
          return false;
        }
        if (userGluten && !lowercaseTags.includes("gluten")) {
          return false;
        }
        if (userNut && !lowercaseTags.includes("nut")) {
          return false;
        }
      }

      return true;
    };

    const userFilteredRecipes = allRecipes.filter(filterDecider);
    console.log("user filtered recipes", userFilteredRecipes);

    // update list of recipes
    setFilteredRecipes(userFilteredRecipes);
  };

  // set search form and recipes to default
  const handleFormClear = () => {
    setSearchFormState(defaultSearchFormState);
    setFilteredRecipes(allRecipes);
  };

  const recipeItem = (item, index) => {
    const route = encodeURIComponent(
      item.name.toLowerCase().replace(/[^a-z0-9 _-]+/gi, "-")
    );
    return (
      <Link to={`/findrecipe/${route}`}>
        <ListItem key={item.data + "__" + index}>
          <ListItemText>{item.name}</ListItemText>
          <ListItemText>{item.difficulty}</ListItemText>
          <ListItemText>{item.time + "min "}</ListItemText>
          <ListItemText>{item.spiceLevel + " "}</ListItemText>
          <ListItemText>{item.ingredients+ " "}</ListItemText>
        </ListItem>
      </Link>
    );
  };
  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
       value: 5,
       label: '5',
      },
  ];

  function valuetext(value) {
    return `${value}`;
  }
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded); 
  };

  return (
    <div className="recipemenu-outer-container">

        <div>
          <form className="form" onSubmit={handleSearchSubmit}>
            <div className="recipe-info">
              <div className="recipename-container">
                <label className="text-container" htmlFor="recipename">
                  Recipe Name
                </label>
                <input
                  name="recipeName"
                  className="formFieldInput"
                  placeholder="Enter the Recipe"
                  onChange={handleSearchInput}
                  value={searchFormState.recipeName}
                />
              </div>

              <div className="time-container">
                <div className="text-container">Time to Cook (min)</div>
                <div className="form-time">
                  <TextField
                    color="success"
                    focused
                    sx={{ width: 80 }}
                    InputProps={{
                      sx: { height: 45 },
                      //   inputProps: {
                      //     max: 60,
                      //     min: 5,
                      //   },
                    }}
                    name="time"
                    id="standard-number"
                    variant="standard"
                    type="number"
                    onChange={handleSearchInput}
                    value={searchFormState.time}
                  />
                </div>
              </div>

              <div className="difficulty">
                <div className="text-container">Difficulty</div>
                <div className="rating">
                  <Rating
                    name="difficulty"
                    type="text"
                    onChange={handleSearchInput}
                    value={searchFormState.difficulty}
                  />
                </div>
              </div>

              <div className="spice">
                <div className="text-container">Spice Level</div>
                <div className="spice-rating">
                  <StyledRating
                    defaultValue={1}
                    max={3}
                    getLabelText={(value) =>
                      `${value} Fire${value !== 1 ? "s" : ""}`
                    }
                    precision={0.5}
                    icon={<WhatshotIcon fontSize="inherit" />}
                    emptyIcon={<WhatshotOutlinedIcon fontSize="inherit" />}
                    name="spice"
                    value={searchFormState.spice}
                    type="text"
                    onChange={handleSearchInput}
                  />
                </div>
              </div>

              <div className="tags">
                <div className="text-container">Filters</div>
                <div className="check-box">
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="vegetarian"
                          checked={searchFormState.vegetarian}
                          onChange={() => {
                            setSearchFormState((e) => ({
                              ...searchFormState,
                              vegetarian: !searchFormState.vegetarian,
                            }));
                          }}
                          color="success"
                          size="small"
                        />
                      }
                      label="Vegetarian"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="vegan"
                          checked={searchFormState.vegan}
                          onChange={() =>
                            setSearchFormState((e) => ({
                              ...searchFormState,
                              vegan: !searchFormState.vegan,
                            }))
                          }
                          color="success"
                          size="small"
                        />
                      }
                      label="Vegan"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="dairyfree"
                          checked={searchFormState.dairy}
                          onChange={() =>
                            setSearchFormState((e) => ({
                              ...searchFormState,
                              dairy: !searchFormState.dairy,
                            }))
                          }
                          color="success"
                          size="small"
                        />
                      }
                      label="Dairy Free"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="glutenfree"
                          checked={searchFormState.gluten}
                          onChange={() =>
                            setSearchFormState((e) => ({
                              ...searchFormState,
                              gluten: !searchFormState.gluten,
                            }))
                          }
                          color="success"
                          size="small"
                        />
                      }
                      label="Gluten Free"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="nutfree"
                          checked={searchFormState.nut}
                          onChange={() =>
                            setSearchFormState(() => ({
                              ...searchFormState,
                              nut: !searchFormState.nut,
                            }))
                          }
                          color="success"
                          size="small"
                        />
                      }
                      label="Nut Free"
                    />
                  </FormGroup>
                  <button className="submit-button" type="submit">
                    Search
                  </button>
                  <button onClick={handleFormClear}>Clear</button>
                </div>
                <div className="ingredientsteps-container">
                  <div></div>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      ></Typography>
                      <Typography variant="h5" component="div">
                        <CardActions>
                          {filteredRecipes.map((recipeItem)=>{
                            return (
                              <div>
                              <Grid item  >
                              <Card sx={{ width: 300, marginRight:2, marginTop: 2}} style={{backgroundColor:'lightgray'}} >
                              <Typography sx={{marginLeft:1, marginTop: 1}} >
                              {recipeItem.data}
                              {recipeItem.name}
                              </Typography>
                                <div className="recipe-tags">
                                <Typography sx={{marginLeft:1, marginTop: 1}} >
                                <p>Time: {recipeItem.time} mins </p>
                                <p>Difficulty: {recipeItem.difficulty}</p>
                                <p>Spice Level: {recipeItem.spiceLevel} </p>
                                </Typography>
                                <CardActions disableSpacing>
                                <div className="bookmark">
                                <IconButton aria-label="Bookmark">
                                  <BookmarkBorderIcon />
                                </IconButton>
                                 </div>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                  >
                                    <ExpandMore/>
                                  </ExpandMore>
                                  </CardActions>
                                  <Collapse in={expanded} timeout="auto" unmountOnExit> 
                                  <CardContent>
                                <Typography >
                                Steps: {recipeItem.steps}
                                
                                </Typography>
                                <Typography >
                                Ingredients: {recipeItem.inventory}
                                
                                </Typography>
                                <Typography>
                                <span size="small">{recipeItem.ingredients.map((ingredient) => {
                                   return <div>
                                    <span>{ingredient.name}</span>
                                    <span>Quantity: {ingredient.quantity}</span>
                                   </div>
                                  })}</span>
                                </Typography>

                               
                                </CardContent>
                                </Collapse>
                                </div>
                                </Card>
                              </Grid>
                              
                              </div>
                            )
                          })}
                        </CardActions>
                      </Typography>
                    </CardContent>
                  </Card>

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}

export default FindRecipe;
