using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinViewer.Models.Domain
{
    public class Coin
    {
        public int Id { get; set; }
        public string CoinName { get; set; }
        public string Symbol { get; set; }
    }
}
