using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUDTASK12.Data;
using CRUDTASK12.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CRUDTASK12.Controllerss
{
    [Route("api/[controller]")]
    [ApiController]
    public class Customer : ControllerBase
    {
        private readonly AppDbContext _context;

        public Customer(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var customers = _context.Customers.ToList();
                if (customers.Count == 0)
                {
                    return NotFound("Invalid Customers are not present");
                }
                return Ok(customers);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{Id}")]
        public IActionResult Get(int Id)
        {
            try
            {
                var customer = _context.Customers.Find(Id);
                if (customer == null)
                {
                    return NotFound($"Customers are not present with name id {Id}");
                }
                return Ok(customer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(Models.Customeraz model)
        {
            try
            {
                _context.Add(model);
                _context.SaveChanges();
                return Ok("Customer is Created Successfully.");
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{Id}")]
        public IActionResult Put(Models.Customeraz model)
        {
            if (model == null || model.Id == 0)
            {
                if (model == null)
                {
                    return BadRequest("Model data is not correct");
                }
                else if (model.Id == 0)
                {
                    return BadRequest($"Customer Id {model.Id} is Invalid");
                }
            }

            try
            {
                var customer = _context.Customers.Find(model.Id);
                if (customer == null)
                {
                    return NotFound($"Customers are not available with id {model.Id}");
                }
                customer.Name = model.Name;
                customer.DOB = model.DOB;
                customer.Email = model.Email;
                customer.ContactNo = model.ContactNo;
                _context.SaveChanges();
                return Ok("Customer details is Created.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult Delete(int Id)
        {
            try
            {
                var customer = _context.Customers.Find(Id);
                if (customer == null)
                {
                    return NotFound($"Customers are not available with id {Id}");
                }
                _context.Customers.Remove(customer);
                _context.SaveChanges();
                return Ok("Customer details is deleted.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}









