using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            public Handler(DataContext context)
            {
                _context = context;
            }

            private DataContext _context { get; }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var act = await _context.Activities.FindAsync(request.Id);
                if(act == null)
                {
                    throw new Exception("Could not find activity");
                }

                act.Title = request.Title ?? act.Title;
                act.Description = request.Description ?? act.Description;
                act.Category = request.Category ?? act.Category;
                act.Date = request.Date ?? act.Date;
                act.City = request.City ?? act.City;
                act.Venue = request.Venue ?? act.Venue;

                var s = await _context.SaveChangesAsync() > 0;
                if (s){
                    return Unit.Value;
                }

                throw new Exception("Problem saving changes");
            }
        }
    }
}