using EntityFramework.DataBaseContext;
using EntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EntityFramework.DBclass
{
    public class Comment
    {
        private readonly DziejeSieContext _dbcontext;

        public Comment(DziejeSieContext dbcontext) { _dbcontext = dbcontext; }

        public dynamic AddComment([FromBody]Comments Comment) {
            try
            {
                Events Event = _dbcontext.Event.Single(x => x.EventId.Equals(Comment.EventId));
                _dbcontext.Add(Comment);
                _dbcontext.SaveChanges();
            }
            catch (System.Exception)
            {
                return new
                {
                    Code = 1,
                    Type = "CommentAdd",
                    Desc = "Event does not exist"
                };
            }
            return new
            {
                Code = 0,
                Type = "CommentAdd",
                Desc = "Success"
            };
        }

        public dynamic GetComment(int id) {
            try
            {
                Comments Comment = new Comments();
                Comment = _dbcontext.Comment.Single(c => c.CommentId == id);
                return new
                {
                    CommentId = Comment.CommentId,
                    Body = Comment.Body,
                    AddDate = Comment.AddDate.ToString("dd-MM-yyy"),
                    AddHour = Comment.AddDate.ToString("HH:mm"),
                    UserId = Comment.UserId,
                    EventId = Comment.EventId
                };
            }
            catch (System.Exception)
            {
                return new
                {
                    Code = 1,
                    Type = "CommentGet",
                    Desc = "There is no comment with such ID"
                };
            }
        }

        public dynamic ModifyComment(int id, [FromBody]Comments Comment)
        {
            Comments toModify = new Comments();

            try
            {
                toModify = _dbcontext.Comment.Single(x => x.CommentId.Equals(id));
            }
            catch (System.Exception)
            {
                var Error = new
                {
                    Code = 2,
                    Type = "CommentModify",
                    Desc = "There is no event with specified ID"
                };
                return Error;
            }

            if (Comment.Body != null || Comment.Body != "") toModify.Body = Comment.Body;

            _dbcontext.SaveChanges();
            return toModify;
        }

        public dynamic DeleteComment(int id)
        {
            Comments toDelete = _dbcontext.Comment.Single(e => e.CommentId == id);
            if (toDelete != null)
            {
                _dbcontext.Comment.Remove(toDelete);
                _dbcontext.SaveChanges();

                var Response = new
                {
                    Code = 0,
                    Type = "CommentDelete",
                    Desc = "Success"
                };
                return Response;
            }
            else
            {
                var Response = new
                {
                    Code = 1,
                    Type = "CommentDelete",
                    Desc = "Comment deletion failed"
                };
                return Response;
            }
        }

        public dynamic GetCommentsForUser(int UserId) {
            List<Comments> Comments = new List<Comments>();
            try
            {
                Comments = _dbcontext.Comment.Where(x => x.UserId == UserId).ToList();
                return Comments;
            }
            catch (System.Exception)
            {
                return new
                {
                    Code = 2,
                    Type = "Comment",
                    Desc = "Specified user has not written any comments yet"
                };
            }
        }

        public dynamic GetCommentsForEvent(int EventId)
        {
            List<Comments> Comments = new List<Comments>();
            try
            {
                Comments = (from x in _dbcontext.Comment
                            where x.EventId == EventId
                            select x).ToList();
                return Comments;
            }
            catch (System.Exception)
            {
                return new
                {
                    Code = 3,
                    Type = "Comment",
                    Desc = "There are no comments for choosen event"
                };
            }
        }
    }
}
