using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinViewer.Models.Domain
{
    public class AllCoins
    {
        public string CoinName { get; set; }
        public string Symbol { get; set; }
        public double NumberOfCoins { get; set; }
        public int Id { get; set; }
        public double AverageValue { get; set; }
    }
}
