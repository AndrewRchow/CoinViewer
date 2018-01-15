using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinViewer.Models.Response
{
    /// <summary>
    /// The Base class for all our Response models. 
    /// If it is going out the door from our Api it must inherit form here.
    /// </summary>
    public abstract class BaseResponse
    {
        public bool IsSuccessful { get; set; }

        public string TransactionId { get; set; }

        public BaseResponse()
        {
            //Memeni: This TxId we are just faking to demo the purpose
            this.TransactionId = Guid.NewGuid().ToString();
        }
    }
}
