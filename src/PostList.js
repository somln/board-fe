import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function PostList() {  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpVHY4Z3dsUGFPclJ0OFRvVkdpQVU2YnBHdmVyX0hoMDdfU3RzdmptbTVZIn0.eyJleHAiOjE3MjYxMzE4MTEsImlhdCI6MTcyNjEzMTUxMSwianRpIjoiOTlhN2VmMGUtMGIwYS00ZmEyLWIxMjQtYTRmMTg4OTA1ZjBhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL3JlYWxtcy9ib2FyZCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJiZjUyNmNlOC0xNDhiLTRiM2QtOGFkNS0yMmUzYjEwMDMzN2MiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtYWluX2NsaWVudCIsInNlc3Npb25fc3RhdGUiOiI5ZGUwODhjNy05ODdiLTQ4YmYtOTU3Ni0xNDE3ZmI5NzQ5ODAiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtdGVzdCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJtYWluX2NsaWVudCI6eyJyb2xlcyI6WyJVU0VSIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI5ZGUwODhjNy05ODdiLTQ4YmYtOTU3Ni0xNDE3ZmI5NzQ5ODAiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6Im5hbWUyIiwiZW1haWwiOiJlbWFpbDJAZXhhbXBsZS5jb20ifQ.fElEIBG2_zy-u2cDuz4T9nrZD7g3HY6g2tlsiZaV2scCVndwliD0mbQee14iO87y792ykGnBRzzgW97QtRk422enLNMaWk2F9OFtanRxBvZ5OiytAojORlaJ74APmY6yCwZf6mSpFMtgRqBP_wMNK8otxnYksos2PbAw4hTkQwlun2VprfJWpLjwTnZM066DvKfaF9UEoPjYjMG1OsslnnoeHBaQbhYum_QSwcthC2z7wydDkVCMR1Hi_OD0hFAiLwte0kDmzTKHYaTUi_Fcp1H6EFXejrNB2YsiMzfrZKh0GsF-R-bafGcCrafTYTwQ1rYtqNuDn_MXQEx8s0SLnQ";

        const response = await fetch('http://localhost:8080/api/posts?sort=desc', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}` 
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const result = await response.json();
        setPosts(result.data.posts);  
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container my-3">
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th> {/* 작성자 추가 */}
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.postId}>
              <td>{index + 1}</td>
              <td>
                <a href={`/post/detail/${post.postId}`}>{post.title}</a>
              </td>
              <td>{post.username}</td> {/* 작성자 추가 */}
              <td>{new Date(post.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
