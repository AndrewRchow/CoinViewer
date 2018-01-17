using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CoinViewer.Models.Domain;
using CoinViewer.Models.Requests;
using CoinViewer.Models.Response;
using CoinViewer.Services;


namespace CoinViewer.Controllers.Api
{
    [RoutePrefix("api/coin")]
    public class CoinApiController : ApiController
    {
        CoinsService coinsService = new CoinsService();

        [Route("user/add"), HttpPost]
        public HttpResponseMessage AddCoins(AddCoinsAddRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            try
            {
                SuccessResponse resp = new SuccessResponse();
                coinsService.AddCoins(model);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("user/sell"), HttpPost]
        public HttpResponseMessage SellCoins(SellCoinsAddRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            try
            {
                SuccessResponse resp = new SuccessResponse();
                coinsService.SellCoins(model);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("user/history"), HttpPost]
        public HttpResponseMessage AddHistory(TradeHistoryAddRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            try
            {
                ItemResponse<int> resp = new ItemResponse<int>();
                resp.Item = coinsService.AddHistory(model);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("user/history"), HttpGet]
        public HttpResponseMessage GetAllUserHistory()
        {
            try
            {
                ItemsResponse<History> resp = new ItemsResponse<History>();
                resp.Items = coinsService.GetAllUserHistory();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }


        [Route, HttpPost]
        public HttpResponseMessage InsertNames(CoinNameAddRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            try
            {
                ItemResponse<int> resp = new ItemResponse<int>();
                resp.Item = coinsService.InsertCoinName(model);

                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route, HttpGet]
        public HttpResponseMessage GetCoinNames()
        {
            try
            {
                ItemsResponse<Coin> resp = new ItemsResponse<Coin>();
                resp.Items = coinsService.SelectAllCoinNames();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("user/allCoins"), HttpGet]
        public HttpResponseMessage GetAllUserCoins()
        {
            try
            {
                ItemsResponse<AllCoins> resp = new ItemsResponse<AllCoins>();
                resp.Items = coinsService.GetAllUserCoins();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("user/investmentNumbers"), HttpGet]
        public HttpResponseMessage GetUserInvestmentNumbers()
        {
            try
            {
                ItemResponse<InvestmentNumbers> resp = new ItemResponse<InvestmentNumbers>();
                resp.Item = coinsService.GetInvestmentNumbers();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

    }
}