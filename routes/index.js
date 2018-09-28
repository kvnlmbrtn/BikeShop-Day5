
var express = require('express');
var router = express.Router();

var catalogue = [
  {image: "/images/bike-1.jpg", model: "BIKO45", price: 679, quantity: 1, inBasket: "false"},
  {image: "/images/bike-2.jpg", model: "ZOOK7", price: 799, quantity: 1, inBasket: "false"},
  {image: "/images/bike-3.jpg", model: "LIKO89", price: 839, quantity: 1, inBasket: "false"},
  {image: "/images/bike-4.jpg", model: "GEWO", price: 1206, quantity: 1, inBasket: "false"},
  {image: "/images/bike-5.jpg", model: "TITANS", price: 989, quantity: 1, inBasket: "false"},
  {image: "/images/bike-6.jpg", model: "AMIG39", price: 599, quantity: 1, inBasket: "false"}
]

var userName;


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('welcome', { userName: userName });
});


router.post('/shop', function(req, res, next) {
  req.session.userName = req.body.userName;
  res.render('shop', { userName: req.session.userName, catalogue: catalogue});
});

router.get('/shop', function(req, res, next){
  res.render('shop', {userName: req.session.userName, catalogue: catalogue})
});


  // Gestion de l'ajout d'un élément dans le panier

  router.get("/basket", function(req, res, next) {

    // On crée une variable de session éale au panier

      if (typeof req.session.panier == "undefined") {
        req.session.panier = [];
        req.session.panier.push(catalogue[req.query.position]);
      }


      // Pour éviter de se retrouver avec une nouvelle ligne dès qu'un item est ajouté, on vérifie si cet item est présent dans le panier grâce à la valeur de la propriété inBasket dans la variable globale catalogue. Si true, alors on ajoute simplement 1 à la quantité du produit dans le panier. Sinon, on ajoute une card pour ce produit

      var isInBasket = false;

      if (req.session.panier.length >0) {

          for(var i=0; i <req.session.panier.length; i++) {
            if (req.session.panier[i].model == req.query.model){
              req.session.panier[i].quantity++;
              isInBasket = true;
            }
          }

          if(isInBasket == false){
            req.session.panier.push(req.query)
          }

        }

      res.render('basket', {userName: req.session.userName, panier: req.session.panier})

    });




    router.get('/delete-item', function(req, res, next) {


        // Ici on supprime d'abord l'élément de la variable globale panier

        for (var j=0; j<req.session.panier.length; j++) {
          if (req.query.model == req.session.panier[j].model) {
            req.session.panier.splice(j, 1);

            // Il faut maintenant changer la valeur de la propriété inBasket dans la variable globale catalogue, sinon le vélo ne pourra plus être ajouté par la suite. De même on change la valeur de la propriété quantity à 0, comme ça si l'utilisateur clique à nouveau sur cet item, la quantité ajoutée au panier sera de 1, et non l'ancienne valeur + 1

            for (var k=0; k<catalogue.length; k++) {
              if (req.query.model == catalogue[k].model) {
                catalogue[k].inBasket = "false";
                catalogue[k].quantity = Number(1);
              }
            }

          }
        }

        console.log(req.query);
        res.render('basket', { userName: req.session.userName, panier: req.session.panier });
    });


    router.get('/update-item', function(req, res, next) {

        for (var i=0; i<req.session.panier.length; i++) {
          if (req.query.model == req.session.panier[i].model) {
              req.session.panier[i].quantity = req.query.newQuantity.toLocaleString();

              for (var j=0; j<req.session.panier.length; j++) {
                if (req.query.model == catalogue[j].model) {
                    catalogue[j].quantity = req.query.newQuantity.toLocaleString();
                }
              }

          }
        }

        res.render('basket', { userName: req.session.userName, panier: req.session.panier });
    });


module.exports = router;
