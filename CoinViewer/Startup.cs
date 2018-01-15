using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CoinViewer.Startup))]
namespace CoinViewer
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
