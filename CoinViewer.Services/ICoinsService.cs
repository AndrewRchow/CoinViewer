using System.Collections.Generic;
using CoinViewer.Models.Domain;
using CoinViewer.Models.Requests;

namespace CoinViewer.Services
{
    public interface ICoinsService
    {
        void AddCoins(AddCoinsAddRequest model);
        int InsertCoinName(CoinNameAddRequest model);
        List<Coin> SelectAllCoinNames();
    }
}