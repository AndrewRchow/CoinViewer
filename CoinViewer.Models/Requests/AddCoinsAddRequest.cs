using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinViewer.Models.Requests
{
    public class AddCoinsAddRequest
    {
            public int CoinId { get; set; }
            public int NumberPurchased { get; set; }
            public int CurrentPrice { get; set; }
    }


}

