using GestionMission.Entities;
using GestionMission.Interfaces;
using GestionMission.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace GestionMission.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaimentController : ControllerBase
    {
        private readonly IPaimentService _service;

        public PaimentController(IPaimentService service)
        {
            _service = service;
        }

        // GET: api/paiment
        [HttpGet]
        public ActionResult<List<Payment>> GetAll()
        {
            try
            {
                var paiments = _service.FindAll();
                return Ok(paiments);
            }
            catch (Exception ex)
            {
                return BadRequest("Error retrieving paiments: " + ex.Message);
            }
        }

        // GET: api/paiment/5
        [HttpGet("{id}")]
        public ActionResult<Payment> GetById(int id)
        {
            try
            {
                var paiment = _service.FindById(id);
                if (paiment == null)
                {
                    return NotFound("Paiment not found.");
                }
                return Ok(paiment);
            }
            catch (Exception ex)
            {
                return BadRequest("Error retrieving paiment: " + ex.Message);
            }
        }

        // POST: api/paiment
        [HttpPost]
        public ActionResult<Payment> Add([FromBody] Payment paiment)
        {
            try
            {
                if (paiment == null)
                {
                    return BadRequest("Paiment data is required.");
                }

                var addedPaiment = _service.Add(paiment);
                return CreatedAtAction(nameof(GetById), new { id = addedPaiment.Id }, addedPaiment);
            }
            catch (Exception ex)
            {
                return BadRequest("Error adding paiment: " + ex.Message);
            }
        }

        // PUT: api/paiment/5
        [HttpPut("{id}")]
        public ActionResult<Payment> Update(int id, [FromBody] Payment paiment)
        {
            try
            {
                if (paiment == null)
                {
                    return BadRequest("Paiment data is required.");
                }

                var updatedPaiment = _service.Update(paiment, id);
                if (updatedPaiment == null)
                {
                    return NotFound("Paiment not found.");
                }
                return Ok(updatedPaiment);
            }
            catch (Exception ex)
            {
                return BadRequest("Error updating paiment: " + ex.Message);
            }
        }

        // DELETE: api/paiment/5
        [HttpDelete("{id}")]
        public ActionResult<Payment> Delete(int id)
        {
            try
            {
                var paiment = _service.Delete(id);
                if (paiment == null)
                {
                    return NotFound("Paiment not found.");
                }
                return Ok(paiment);
            }
            catch (Exception ex)
            {
                return BadRequest("Error deleting paiment: " + ex.Message);
            }
        }
    }
}
