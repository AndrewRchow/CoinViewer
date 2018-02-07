using System.Collections.Generic;

namespace CoinViewer
{
    public interface ICoinsService
    {
        void AddCoins(AddCoinsAddRequest model);
        void SellCoins(SellCoinsAddRequest model);
        int AddHistory(TradeHistoryAddRequest model);
        int InsertCoinName(CoinNameAddRequest model);
        List<Coin> SelectAllCoinNames();
        List<AllCoins> GetAllUserCoins();
        InvestmentNumbers GetInvestmentNumbers();
        List<History> GetAllUserHistory();
    }
}