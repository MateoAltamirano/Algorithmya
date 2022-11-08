using Algorithmya.Core.Entities;
using Algorithmya.Infrastructure.Interfaces;
using Algorithmya.Infrastructure.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AlgorithmyaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class DataStructureController : ControllerBase
    {
        private readonly IDataStructureService _dataStructureService;

        public DataStructureController(IDataStructureService dataStructureService)
        {
            _dataStructureService = dataStructureService;
        }

        /// <summary>
        /// Gets all the data structures
        /// </summary>
        /// <returns>The data structures with its details</returns>
        /// <response code="200">Returns the data structures with its details</response>
        /// <response code="401">If the user is not authenticated</response>
        /// <response code="404">If the data structures are not found</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetDataStructures()
        {
            var dataStructures = _dataStructureService.GetDataStructures();

            var response = new APIResponse<List<DataStructure>>(dataStructures, null);

            return Ok(response);
        }
    }
}
