from datetime import datetime, timedelta

fridge = [{"date":"Wed, 22 Nov 2023 05:00:00 GMT","fridge":False,"ingredient":"milk","quantity":1,"unit":"gallon"},
{"date":"Thu, 25 Nov 2027 05:00:00 GMT","fridge":False,"ingredient":"salt","quantity":400,"unit":"grams"},
{"date":"Thu, 25 Nov 2027 05:00:00 GMT","fridge":True,"ingredient":"jelly","quantity":10,"unit":"tablespoon"},
{"date":"Thu, 25 Nov 2027 05:00:00 GMT","fridge":True,"ingredient":"peanut butter","quantity":10,"unit":"tablespoon"},
{"date":"Thu, 25 Nov 2027 05:00:00 GMT","fridge":True,"ingredient":"bread","quantity":12,"unit":"Null"},
{"date": "Thu, 25 Nov 2027 05:00:00 GMT", "fridge": True, "ingredient": "pasta", "quantity": 12, "unit": "Null"}        ]

recipeDict = {0:{"author":"admin","difficulty":1,"ingredients":[{"name":"Peanut Butter","quantity":2.0,"unit":"tablespoon"},{"name":"Jelly","quantity":2.0,"unit":"tablespoon"},{"name":"Bread","quantity":2.0,"unit":"slice"}],"name":"Peanut Butter and Jelly Sandwich","price":1,"spiceLevel":0,"steps":["Spread peanut butter evenly on 1 slice of bread.","Spread jelly on another slice of bread.","Put slices together so that the peanut butter and jelly are aligned."],"tags":["Vegan","Vegetarian"],"time":5},


1:{"author":"admin","difficulty":2,"ingredients":[{"name":"Rice","quantity":1.0,"unit":"cup"},{"name":"Egg","quantity":1.0,"unit":'Null'},{"name":"Shallot","quantity":1.0,"unit":'Null'},{"name":"Red Thai Chile","quantity":1.0,"unit":'Null'},{"name":"Spring Onion","quantity":2.0,"unit":'Null'},{"name":"Garlic","quantity":4.0,"unit":"piece"},{"name":"Soy Sauce","quantity":2.0,"unit":"tablespoon"},{"name":"Sugar","quantity":1.0,"unit":"tablespoon"},{"name":"Seasame Oil","quantity":2.0,"unit":"tablespoon"}],"name":"Egg Fried Rice","price":1,"spiceLevel":1,"steps":["Mince garlic and shallot, rough chop spring onion and red chile, and set aside.","Crack and wisk the egg.","Heat wok and add seasame oil when hot.","Fry garlic and shallot until fragrent.","Add whisked egg into the wok and stir until almost cooked through","Add rice, stiring and flattening it constantly","Add soy sauce, spring onion, chilie, and stir constantly when rice is almost done."],"tags":["Wok"],"time":15},

2:{"author":"admin","difficulty":2,"ingredients":[{"name":"Pasta","quantity":1.0,"unit":"pound"},{"name":"Cheese","quantity":1.0,"unit":"pound"},{"name":"Milk","quantity":3.0,"unit":"cup"},{"name":"Butter","quantity":4.0,"unit":"tablespoon"},{"name":"Flour","quantity":0.25,"unit":"cup"}],"name":"Mac & Cheese","price":2,"spiceLevel":0,"steps":["Preheat oven to 350 degrees.","Bring pot of salted water to a boil.","Grate cheese and set aside.","Add pasta and boil. Remove from heat and drain 1 minute before its suggested cooking time.","Grate pepper into milk, then microwave on low for 5 minutes.","Add butter to pan on low heat until fully melted. Gradually add flour in small quantities to butter, whisking as you add.","Slowly pour warm milk into pan in small quantities each time. Then stir in grated cheese.","Turn off head, add pasta to pan and stir.","Pour pasta and cheese into a baking pan, bake for 30 minutes."],"tags":["Oven","Vegetarian"],"time":60},

3:{"author":"admin","difficulty":3,"ingredients":[{"name":"Spring Roll Skin","quantity":12.0,"unit":'Null'},{"name":"Napa","quantity":1.0,"unit":'Null'},{"name":"Pork","quantity":1.0,"unit":"pound"},{"name":"Egg","quantity":1.0,"unit":'Null'},{"name":"Vegetable Oil","quantity":16.0,"unit":"fluid ounce"},{"name":"Soy Sauce","quantity":4.0,"unit":"tablespoon"}],"name":"Spring Rolls","price":1,"spiceLevel":0,"steps":["Slice all ingredients to small strips as small as posible without breaking it.","In pan, add oil and fry sliced pork over medium heat. As soon as color changes (before the meat gets well done), add napa and soy sauce and stir fry.","Take out the stir fried filling and drain. Put in fridge for 5 minute to cool down.","Take out the filling. Crack the egg for egg white. Lay spring roll skins flat, put filling diagonally by one corner of the skin, fold like an envelope, and roll. Seal the spring roll by applying egg white on the last corner so that the spring roll does not open up during frying.","In pot, add oil to prepare to deep fry in medium heat. When oil is hot, add spring rolls into the pot. Flip when the skin color is golden, takes approximately 5 minutes but time may vary.","Take out the spring roll and lay on kitchen paper to absorb abundant oil, then plate."],"tags":["Chinese"],"time":60},

4:{"author":"admin","difficulty":2,"ingredients":[{"name":"Lobster Meat","quantity":0.5,"unit":"pound"},{"name":"Macaroni","quantity":1.0,"unit":"pound"},{"name":"Gruyere Cheese","quantity":12.0,"unit":"ounce"},{"name":"Sharp Cheddar Cheese","quantity":0.5,"unit":"pound"},{"name":"Milk","quantity":3.0,"unit":"cup"},{"name":"Butter","quantity":4.0,"unit":"tablespoon"},{"name":"Flour","quantity":0.25,"unit":"cup"}],"name":"Lobster Mac & Cheese","price":4,"spiceLevel":0,"steps":["Preheat oven to 375 degrees.","Bring pot of salted water to a boil.","Grate cheeses and set aside.","Add pasta and boil. Remove from heat and drain 1 minute before its suggested cooking time.","Grate pepper into milk, then microwave on low for 5 minutes.","Add butter to pan on low heat until fully melted. Gradually add flour in small quantities to butter, whisking as you add.","Slowly pour warm milk into pan in small quantities each time. Then stir in grated cheese.","Turn off head, add pasta to pan and stir.","Pour pasta and cheeses into a baking pan, fold lobster in, and bake for 30 minutes."],"tags":["Oven","Seafood"],"time":60},

5:{"author":"admin","difficulty":2,"ingredients":[{"name":"Green Bean","quantity":0.5,"unit":"pound"},{"name":"Large Potato","quantity":2.0,"unit":'Null'},{"name":"Vegetable Oil","quantity":8.0,"unit":"fluid ounce"},{"name":"Soy Sauce","quantity":6.0,"unit":"tablespoon"},{"name":"Sugar","quantity":1.0,"unit":"tablespoon"}],"name":"Green Beans and Potato Stir Fry","price":1,"spiceLevel":0,"steps":["Slice all ingredients to small strips. Soak the potato in water to remove excess starch.","In wok or deep frying pan, add generous amount of oil and semi deep fry the potato until it turns gold but is still hard on the outside.","Take out the potato, remove most of the oil, and add the green beans. Fry over medium heat until the green beans begin to look wrinkly.","Add potato back to the wok, stir fry, and add suitable amount of soysauce and sugar. Stir and serve."],"tags":["Chinese","Wok","Vegetarian","Vegan"],"time":45}}

#Accessing all ingreident names in a fridge
def allFridgeIngredients(Fridge):
    fridgeIngredients = []
    for i in Fridge:
        fridgeIngredients.append({'name':i['ingredient'],'quantity':i['quantity'],'unit':i['unit'],'date':i['date']})
    return fridgeIngredients

def allFridgeIngredientsNames(Fridge):
    fridgeIngredients = []
    for i in Fridge:
        fridgeIngredients.append(i['ingredient'])
    return fridgeIngredients


def allRecipeIngredients(aRecipe):
    listOfIngs = []
    for i in aRecipe['ingredients']:
        listOfIngs.append(i['name'].lower())
    return listOfIngs



def percentOfIngredients(Fridge, aRecipe):
    if checkForIngredients(Fridge,aRecipe):
        return 1
    fridgeIng = allFridgeIngredientsNames(Fridge)
    recipeIng = allRecipeIngredients(aRecipe)
    matches = 0
    for i in recipeIng:
        if i in fridgeIng:
            matches = matches + 1
    return round(float(int(matches)/len(recipeIng)),3)

# print(franctionOfIngredients(fridge, recipeDict[0]))
# print(franctionOfIngredients(fridge, recipeDict[1]))
# print(franctionOfIngredients(fridge, recipeDict[2]))
# print(franctionOfIngredients(fridge, recipeDict[3]))
# print(franctionOfIngredients(fridge, recipeDict[4]))
# print(franctionOfIngredients(fridge, recipeDict[5]))





def completeRecipes(Fridge, allRecipes):
    completeRecipes = []
    for i in allRecipes:
        if checkForIngredients(Fridge, i):
            completeRecipes.append(i)
    return completeRecipes

# def recommendation(Fridge, allRecipes):
#     completeRecipes = []
#     incompleteRecipes = []
#     scores = {}
#     for i in allRecipes:
#         if checkForIngredients(Fridge, i):
#             completeRecipes.append(i)
#         else:
#             incompleteRecipes.append(i)
#     for i in completeRecipes:
#         scores[i]
#
#     for i in incompleteRecipes:
date = datetime.today()
date8 = datetime.today() - timedelta(2)
date1 = datetime.today() + timedelta(1)
date2 = datetime.today() + timedelta(2)
date3 = datetime.today() + timedelta(3)
date4 = datetime.today() + timedelta(4)
date7 = datetime.today() + timedelta(7)
print(date8)
print(date1)
print(date2)
print(date3)
print(date4)
print(date7)

print(date1.date()-date.date())

print('end of dates\n\n')


fridgeDate = [{"date":date,"fridge":False,"ingredient":"milk","quantity":1,"unit":"gallon"},
{"date":date1,"fridge":False,"ingredient":"salt","quantity":400,"unit":"grams"},
{"date":date2,"fridge":True,"ingredient":"jelly","quantity":20,"unit":"tablespoon"},
{"date":date3,"fridge":True,"ingredient":"peanut butter","quantity":20,"unit":"tablespoon"},
{"date":date4,"fridge":True,"ingredient":"bread","quantity":12,"unit":"Null"}]

def calcTimeDiff(date):
   today = datetime.today().date()
   date = date.date()
   timeDiff = date - today
   return int(timeDiff.days)


def experationWarningF(aFridge):
    ingredients = allFridgeIngredients(aFridge)
    ingredientScores = []
    for i in ingredients:
        ing = i['date']
        print(ing)
        diff = calcTimeDiff(ing)
        if diff > 3:
            ingredientScores.append(4)
        elif diff == 3:
            ingredientScores.append(3)
        elif diff == 2:
            ingredientScores.append(2)
        elif diff == 1:
            ingredientScores.append(1)
        elif diff == 0:
            ingredientScores.append(1)
        else:
            ingredientScores.append(0)
    return ingredientScores

# scoresD = experationWarningF(fridgeDate)
# print(scoresD)



def experationWarningIng(anIngredient):
    ing = anIngredient['date']
    diff = calcTimeDiff(ing)
    if diff > 3:
        return 4
    elif diff == 3:
        return 3
    elif diff == 2:
        return 2
    elif diff == 1:
        return 1
    elif diff == 0:
        return 1
    else:
        return 0

def checkForIngredients(Fridge, aRecipe):
    fridgeIng = allFridgeIngredients(Fridge)
    fridgeIngNames = allFridgeIngredientsNames(Fridge)
    recipeIng = allRecipeIngredients(aRecipe)
    requiredIngs = []
    # check we have the recipe ingredients in the fridge
    for i in recipeIng:
        if i not in fridgeIngNames:
            return False # return false if we do not

    # make sure we have the enough of the ingredient in the fridge to make the recipe!
    count1 = 0
    for i in fridgeIngNames:
        if i in recipeIng:
            requiredIngs.append(fridgeIng[count1])
        count1 = count1 + 1
    count2 = 0
    for i in requiredIngs:
        fridgeQuant = i['quantity']
        recipeQuant = aRecipe['ingredients'][count2]['quantity']
        if recipeQuant > fridgeQuant:
            return False # return false if we do not have the correct quanitity
        count2 = count2 + 1

    # check the fridge ingredients are not expired
    for i in requiredIngs:
        if experationWarningIng(i) == 0:
            return False  # return false if any required ingredients are expired
    return True

#print(checkForIngredients(fridgeDate, recipeDict[0]))


def createAScore(Fridge,aRecipe):
    if checkForIngredients(Fridge,aRecipe):
        return 10
    fridgeIng = allFridgeIngredients(Fridge)
    fridgeIngNames = allFridgeIngredientsNames(Fridge)
    recipeIng = allRecipeIngredients(aRecipe)
    matches = 0
    for i in recipeIng:
        if i in fridgeIng:
            matches = matches + 1
    percent = round(float(int(matches)/len(recipeIng)),3)
    score = matches * percent
    count3 = 0
    requiredIngs = []
    for i in fridgeIngNames:
        if i in recipeIng:
            requiredIngs.append(fridgeIng[count3])
        count3 = count3 + 1
    for i in requiredIngs:
        score = float(score + (4-experationWarningIng(i)))
    return score

print(createAScore(fridgeDate, recipeDict[2]))

# print(len(fridgeDate))
# print(experationWarningIng(fridgeDate[0]))
# print(experationWarningIng(fridgeDate[1]))
# print(experationWarningIng(fridgeDate[2]))
# print(experationWarningIng(fridgeDate[3]))
# print(experationWarningIng(fridgeDate[4]))

#print(type(fridge[1]['date']))

#print(datetime.today())


