using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static System.Net.WebRequestMethods;


namespace SearcherNIP.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearcherController : ControllerBase
    {
        string url = "https://wl-api.mf.gov.pl/api/search/nip/";

        [HttpGet]
        public async Task<CompanyData> GetCompanyAsync([FromQuery] string nip)
        {
            string responseContent;
            var entityResponse = new EntityResponse();
            var companyData = new CompanyData();

            using var client = new HttpClient();
            var response = await client.GetAsync(url + nip + "?date=" + DateTime.Now.ToString("yyyy-MM-dd"));
            responseContent = await response.Content.ReadAsStringAsync();

            entityResponse = JsonConvert.DeserializeObject<EntityResponse>(responseContent);

            {
                companyData = entityResponse.Result.Subject;
            }

            //send "companyData" to database


            client.Dispose();
            return companyData;

        }

    }
}