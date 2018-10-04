using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinViewer
{
    public class History
    {
        public string TransactionType { get; set; }
        public string CoinName { get; set; }
        public double NumberTraded { get; set; }
        public double CoinPrice { get; set; }
        public DateTime Date { get; set; }

    }
}
