using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                if (act == null){
                    throw new Exception("Could not find activity");
                }

                _context.Remove(act);
                var s = await _context.SaveChangesAsync() > 0;
                if (s){
                    return Unit.Value;
                }

                throw new Exception("Problem saving changes");
            }
        }
    }
}