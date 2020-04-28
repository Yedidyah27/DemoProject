using System;
using System.Net;

namespace Application.Errors
{
    public class RestException : Exception
    {
        public HttpStatusCode Code { get; set; }
        public object Errors { get; set; }
        public RestException(HttpStatusCode code, object error = null)
        {
            this.Errors = error;
            this.Code = code;

        }
    }
}