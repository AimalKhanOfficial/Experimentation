using ExcelDataReader;
using ForecastIO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;

namespace ExcelSheetParser
{
    class Program
    {
        static void Main(string[] args)
        {
            //File Path for Excel Sheet defined in App.config
            var filePath = ConfigurationManager.AppSettings["ExcelFilePath"];

            FileStream stream = File.Open(filePath, FileMode.Open, FileAccess.Read);
            IExcelDataReader excelReader;

            //1. Reading Excel file
            if (Path.GetExtension(filePath).ToUpper() == ".XLS")
            {
                //1.1 Reading from a binary Excel file ('97-2003 format; *.xls)
                excelReader = ExcelReaderFactory.CreateBinaryReader(stream);
            }
            else
            {
                //1.2 Reading from a OpenXml Excel file (2007 format; *.xlsx)
                excelReader = ExcelReaderFactory.CreateOpenXmlReader(stream);
            }

            //2. DataSet - The result of each spreadsheet will be created in the result.Tables
            DataSet result = excelReader.AsDataSet();

            //Get the first excel sheet
            DataTable dt = result.Tables[8];

            //Set of markers entries to export to JSON File
            var markersSet = new List<PlaceMarkerEntry>();

            //Iterate over the Rows
            //var i = 1 because we are skipping the first row
            for (var i = 1; i < dt.Rows.Count; i++)
            {
                if (string.IsNullOrEmpty(Convert.ToString(dt.Rows[i].ItemArray.ElementAt(1))) || string.IsNullOrEmpty(Convert.ToString(dt.Rows[i].ItemArray.ElementAt(2)))) continue;

                //An API Call to forecast.io
                var request = new ForecastIORequest(ConfigurationManager.AppSettings["ForeCastIOSecretKey"], Convert.ToSingle(dt.Rows[i].ItemArray.ElementAt(1)), Convert.ToSingle(dt.Rows[i].ItemArray.ElementAt(2)), Unit.si);
                var response = request.Get();

                var newMarkerEntry = new PlaceMarkerEntry()
                {
                    MarkerDesc = Convert.ToString(dt.Rows[i].ItemArray.ElementAt(0)),
                    Latitude = Convert.ToString(dt.Rows[i].ItemArray.ElementAt(1)),
                    Longitude = Convert.ToString(dt.Rows[i].ItemArray.ElementAt(2)),
                    //Color of Pins based on Weather API Call
                    //http://maps.google.com/mapfiles/ms/icons/red-dot.png
                    PinColor = Convert.ToString("http://maps.google.com/mapfiles/ms/icons/green-dot.png"),
                };

                markersSet.Add(newMarkerEntry);
            }

            //File Path for JSON defined in App.config
            var jsonFilePath = ConfigurationManager.AppSettings["JSONFilePath"];

            //Check if the JSON File Exists
            if (File.Exists(jsonFilePath))
            {
                File.Delete(jsonFilePath);
            }

            //Create a file
            File.Create(jsonFilePath).Close();

            //parsing our markers pointers list with a GLOBAL key name "markerSet"
            string json = "markersSet = " + JsonConvert.SerializeObject(markersSet.ToArray());

            //Write All data to the JSON file
            File.WriteAllText(jsonFilePath, json);


            Console.ReadKey();
        }
    }
}
