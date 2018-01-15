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
    public class CoinsService : ICoinsService
    {

        public void AddCoins(AddCoinsAddRequest model)
        {

            string userId = UserService.GetCurrentUserId();
            if (userId != null)
            {

                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                {
                    conn.Open();
                    {
                        using (SqlCommand cmd = new SqlCommand("dbo.Users_AddCoins", conn))
                        {
                            cmd.CommandType = System.Data.CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@UserId", userId);
                            cmd.Parameters.AddWithValue("@CoinId", model.CoinId);
                            cmd.Parameters.AddWithValue("@NumberPurchased", model.NumberPurchased);
                            cmd.Parameters.AddWithValue("@CurrentPrice", model.CurrentPrice);
                            cmd.ExecuteNonQuery();
                        }
                    }
                }
            }
        }


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

        public List<Coin> SelectAllCoinNames()
        {
            List<Coin> CoinList = new List<Coin>();
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("dbo.GetAllCoinNames", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    SqlDataReader reader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
                    while (reader.Read())
                    {
                        Coin model = Mapper(reader);
                        CoinList.Add(model);
                    }
                }
                conn.Close();
            }
            return CoinList;
        }

        private Coin Mapper(SqlDataReader reader)
        {
            Coin model = new Coin();
            int index = 0;
            model.Id = reader.GetInt32(index++);
            model.CoinName = reader.GetString(index++);


            index++;

            return model;
        }
    }
}
