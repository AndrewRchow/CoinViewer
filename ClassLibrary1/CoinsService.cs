using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoinViewer.Models.Domain;
using CoinViewer.Models.Requests;

namespace CoinViewer.Services
{
    public class CoinsService
    {
        public int InsertCoinName(CoinNameAddRequest model)
        {
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("dbo.StoreCoinNames", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CoinName", model.CoinName);
                    SqlParameter idParam = cmd.Parameters.Add("@Id", SqlDbType.Int);
                    idParam.Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
                    return (int)idParam.Value;
                }
            }
        }
    }
}
