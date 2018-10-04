using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;

namespace CoinViewer.Services
{
    public static class UserService
    {
        public static string GetCurrentUserId()
        {
            return HttpContext.Current.User.Identity.GetUserId(); //Current.User.Identity.GetUserId(asp.net built in) gets the current logged in user id info
        }


    }
}
