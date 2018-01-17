﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinViewer.Models.Requests
{
    public class TradeHistoryAddRequest
    {
        public string TransactionType { get; set; }
        public int CoinId { get; set; }
        public double NumberPurchased { get; set; }
        public double CurrentPrice { get; set; }
    }
}