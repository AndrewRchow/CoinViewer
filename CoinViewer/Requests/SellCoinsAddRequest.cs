using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinViewer
{
    public class SellCoinsAddRequest
    {
        public int CoinId { get; set; }
        public double NumberSold { get; set; }
        public double CurrentPrice { get; set; }
    }
}
