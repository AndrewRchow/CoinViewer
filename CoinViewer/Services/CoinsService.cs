﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinViewer
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

        public void SellCoins(SellCoinsAddRequest model)
        {

            string userId = UserService.GetCurrentUserId();
            if (userId != null)
            {

                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                {
                    conn.Open();
                    {
                        using (SqlCommand cmd = new SqlCommand("dbo.Users_SellCoins", conn))
                        {
                            cmd.CommandType = System.Data.CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@UserId", userId);
                            cmd.Parameters.AddWithValue("@CoinId", model.CoinId);
                            cmd.Parameters.AddWithValue("@NumberSold", model.NumberSold);
                            cmd.Parameters.AddWithValue("@CurrentPrice", model.CurrentPrice);
                            cmd.ExecuteNonQuery();
                        }
                    }
                }
            }
        }

        public int AddHistory(TradeHistoryAddRequest model)
        {

            string userId = UserService.GetCurrentUserId();
            if (userId != null)
            {

                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                {
                    conn.Open();
                    {
                        using (SqlCommand cmd = new SqlCommand("dbo.TradeHistory_AddEntry", conn))
                        {
                            cmd.CommandType = System.Data.CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@TransactionType", model.TransactionType);
                            cmd.Parameters.AddWithValue("@UserId", userId);
                            cmd.Parameters.AddWithValue("@CoinId", model.CoinId);
                            cmd.Parameters.AddWithValue("@NumberTraded", model.NumberPurchased);
                            cmd.Parameters.AddWithValue("@CoinPrice", model.CurrentPrice);
                            SqlParameter idParam = cmd.Parameters.Add("@Id", SqlDbType.Int);
                            idParam.Direction = ParameterDirection.Output;
                            cmd.ExecuteNonQuery();
                            return (int)idParam.Value;

                        }
                    }
                }
            }
            return -1;
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
                    cmd.Parameters.AddWithValue("@Symbol", model.Symbol);
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

        public List<AllCoins> GetAllUserCoins()
        {
            string userId = UserService.GetCurrentUserId();
            if (userId != null)
            {
                List<AllCoins> CoinList = new List<AllCoins>();
                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("dbo.Users_GetAllCoins", conn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        SqlDataReader reader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
                        while (reader.Read())
                        {
                            AllCoins model = Mapper2(reader);
                            CoinList.Add(model);
                        }
                    }
                    conn.Close();
                }
                return CoinList;
            }
            return null;
        }


        private AllCoins Mapper2(SqlDataReader reader)
        {
            AllCoins model = new AllCoins();
            int index = 0;
            model.CoinName = reader.GetString(index++);
            model.Symbol = reader.GetString(index++);
            model.NumberOfCoins = reader.GetDouble(index++);
            model.Id = reader.GetInt32(index++);
            model.AverageValue = reader.GetDouble(index++);
            index++;
            return model;
        }

        public InvestmentNumbers GetInvestmentNumbers()
        {
            string userId = UserService.GetCurrentUserId();
            if (userId != null)
            {
                InvestmentNumbers singleItem = null;
                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("dbo.Users_GetInvestmentNumbers", conn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        SqlDataReader reader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
                        while (reader.Read())
                        {
                             singleItem = Mapper3(reader);                       
                        }

                    }
                    conn.Close();
                }
                return singleItem;
            }
            return null;
        }
        private InvestmentNumbers Mapper3(SqlDataReader reader)
        {
            InvestmentNumbers model = new InvestmentNumbers();
            int index = 0;
            model.Invested = reader.GetDouble(index++);
            model.Revenue = reader.GetDouble(index++);

            return model;
        }

        public List<History> GetAllUserHistory()
        {
            string userId = UserService.GetCurrentUserId();
            if (userId != null)
            {
                List<History> HistoryList = new List<History>();
                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand("dbo.TradeHistory_GetUserHistory", conn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        SqlDataReader reader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
                        while (reader.Read())
                        {
                            History model = Mapper4(reader);
                            HistoryList.Add(model);
                        }
                    }
                    conn.Close();
                }
                return HistoryList;
            }
            return null;
        }
        private History Mapper4(SqlDataReader reader)
        {
            History model = new History();
            int index = 0;
            model.TransactionType = reader.GetString(index++);
            model.CoinName = reader.GetString(index++);
            model.NumberTraded = reader.GetDouble(index++);
            model.CoinPrice = reader.GetDouble(index++);
            model.Date = reader.GetDateTime(index++);
            index++;
            return model;
        }
    }
}
