using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CoinViewer.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View("Dashboard");
        }

        public ActionResult Dashboard()
        {
            return View();
        }

        public ActionResult AddCoins()
        {
            ViewBag.Message = "Bought Coins";

            return View();
        }

        public ActionResult SellCoins()
        {
            ViewBag.Message = "Sold Coins";

            return View();
        }

        public ActionResult History()
        {
            ViewBag.Message = "Your transaction history.";

            return View();
        }


    }
}