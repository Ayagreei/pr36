var addFood,feed;
var fedTime, lastFed;
var foodObj;
var foods, foodStock;
var dog,happyDog;
var database;
function preload(){
  //Load images here
  happyDog=loadImage("images/dogImg1.png");
  sadDog=loadImage("images/dogImg.png");
}
function setup(){
    database = firebase.database();

    createCanvas(1000,700);

    foodObj = new Food();

    foodStock = database.ref('Food')
    foodStock.on("value",readStock)

    feed = createButten("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);

    addFood = createButten("Feed the dog");
    addFood.position(700,95);
    addFood.mousePressed(feedDog);

    dog = createSprite(250,250,10,10);
    dog.addImage(sadDog)
    dog.scale=0.1

}

function draw(){
    background("green");
    foodObj.display();

    fedTime = database.ref('FeedTime')
    fedTime.on("value",function(data){
      lastPad = data.val();
    }) 

    fill(255,255,254);
    textSize(15);
    //if(lastFed>=12){
    //  text("Last Feed : " + lastFed%12 + "pm",)
    //}
       drawSprites();
}

function feedDog (){
  dog.addImage(happyDog)

  foddObj.updateFondStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foods++;
  database.ref('/').update({
    Food: foods
  })
}