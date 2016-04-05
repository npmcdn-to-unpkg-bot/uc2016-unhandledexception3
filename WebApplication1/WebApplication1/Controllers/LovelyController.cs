using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    public class LovelyController : ApiController
    {
        private HttpClient CreateClient()
        {
            var client = new HttpClient(new HttpClientHandler() { UseDefaultCredentials = true });
            string authInfo = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(String.Format("{0}:{1}", @"OSIPROGHACK\hackuser042", "mc9rn0xf2A$")));
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", authInfo);
            return client;
        }

        public async Task<JArray> GetDashboards() //Get Elements under Dashboards Element
        {
            using (var client = CreateClient())
            {
                //Get child elements of Dashboards
                ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
                string uri = @"https://proghackuc2016.osisoft.com/piwebapi/elements/E0tIcvAS36yE2ccCuS-tUXgA80XCWa765RGAygANOjCCtQU0FUVVJOMDQyXFNBTi1EU1RcREFTSEJPQVJEUw/elements";
                HttpResponseMessage response = await client.GetAsync(uri);
                string content = await response.Content.ReadAsStringAsync();
                var DashboardElements = (JArray)JObject.Parse(content)["Items"];
                var result = new JArray();
                foreach (var item in DashboardElements)
                {
                    var dashboard = new JObject();
                    dashboard.Add("Name", item["Name"].Value<string>());
                    dashboard.Add("WebId", item["WebId"].Value<string>());
                    result.Add(dashboard);
                }
                return result;
            }
        }

        public async Task<JObject> GetDashboardConfig(string _WebId) //Get Attribute value of Dashboard* JSON 
        {
            using (var client = CreateClient())
            {
                //Get attributes of dashboard element
                ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
                string uri = string.Format(@"https://proghackuc2016.osisoft.com/piwebapi/elements/{0}/attributes", _WebId);
                HttpResponseMessage response = await client.GetAsync(uri);
                //string content = await response.Content.ReadAsStringAsync();
                var DashboardAttribute = JObject.Parse(await response.Content.ReadAsStringAsync())["Items"].FirstOrDefault();
                var temp = new string[1];
                temp[0] = DashboardAttribute["WebId"].Value<string>();

                string uri2 = string.Format(@"https://proghackuc2016.osisoft.com/piwebapi/streams/{0}/end", DashboardAttribute["WebId"].Value<string>());
                HttpResponseMessage response2 = await client.GetAsync(uri2);

                return JObject.Parse(await response2.Content.ReadAsStringAsync());
            }
        }

        public async Task<List<JObject>> GetKPI([FromUri]string[] _WebId) //Get End Value based on WebIds
        {
            using (var client = CreateClient())
            {
                ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
                var KPIs = new List<JObject>();
                foreach (var id in _WebId)
                {
                    string uri = string.Format(@"https://proghackuc2016.osisoft.com/piwebapi/streams/{0}/end", id);
                    HttpResponseMessage response = await client.GetAsync(uri);
                    var content = JObject.Parse(await response.Content.ReadAsStringAsync());
                    content.Add("WebId", id);
                    KPIs.Add(JObject.Parse(content.ToString()));
                }
                return KPIs;
            }
        }

        public async Task<List<JArray>> GetPlot([FromUri]string[] _WebId) //Get Plot Values based on WebIds
        {
            using (var client = CreateClient())
            {
                var plots = new List<JArray>();
                foreach (var id in _WebId)
                {
                    ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
                    string uri = string.Format(@"https://proghackuc2016.osisoft.com/piwebapi/streams/{0}/interpolated", id);
                    HttpResponseMessage response = await client.GetAsync(uri);

                    var data = (JArray)JObject.Parse(await response.Content.ReadAsStringAsync())["Items"];
                    var result = new JArray();
                    foreach (var item in data)
                    {
                        if (item["Good"].Value<bool>())
                        {
                            var dataPair = new JObject();
                            dataPair.Add("Timestamp", item["Timestamp"].Value<string>());
                            dataPair.Add("Value", item["Value"].Value<double>());
                            dataPair.Add("UnitsAbbreviation", item["UnitsAbbreviation"].Value<string>());
                            result.Add(dataPair);
                        }
                    }
                    var webid = new JObject();
                    webid.Add("WebId", id);
                    result.Add(webid);
                    plots.Add(result);
                }
                return plots;
            }
        }

    }
}
