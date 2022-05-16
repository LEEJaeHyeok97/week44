import { Router } from "express";

const router = Router();

let nextId = 4; // posts 변수에 id를 설정합니다

let posts = [ // posts 배열
  { // posts[0]
    id: 1,
    content: 'A',
    writer: 1,
  },
  { // posts [1]
    id: 2,
    content: 'B',
    writer: 2,
  },
  { // posts [2]
    id: 3,
    content: 'C',
    writer: 3,
  },
];




// res - 서버에서 줄 값 (응답)
//req - 서버가 요청 받은 값(요청)

//개별 항목 조회 params로 path source에서 정보를 가져옴
router.get("/:id", (req, res) => {
  const { id } = req.params;
  if(!posts[id - 1]) {
    return res.json({
      error: "Post not exist",
    });
  }

  return res.json({
    data: posts[id - 1],
  });
});
//res.json({ data: { id: 1,}});


//글 목록(전체) 조회
router.get("/", (req, res) => {
  //res.status(200).json(posts);
  

  return res.json({
    data: posts,
  });

  
});


//글 생성
//x-user-id 형변환 생각
router.post("/", (req, res) => {
  const id = req.header("X-User-Id"); //user ID
  const { content } = req.body;
  const postCount = posts.push({
    id: nextId++,
    content,
    writer: id,
  });
  return res.json({
    data: {
      post: {
        id: postCount,
      },
    },
  });
});


//Post /api/auth/login - 로그인
/*
router.post("/auth/login", (req, res) => {
  const 
})
*/





//글 수정
router.put("/:postId", (req, res) => {
  const userId = parseInt(req.header("X-User-Id"));
  const { postId } = req.params;
  const { content } = req.body;
  const index = posts.findIndex(post => post.writer === userId);
  if(index === -1){
    return res.json({
      error: "That post does not exist",
    });
  }

  if(!(posts[index].writer === userId)){
    return res.json({
      error: "Cannot modify post",
    });
  }

  posts[index].content = content;

  return res.json({
    data: {
      id: posts[index].id,
    },
  });

});

router.delete("/:postId", (req, res) => {
  const { postId } = req.params;
  const userId  = parseInt(req.header("X-User-Id"));
  const index = posts.findIndex(post => post.writer === userId);

  if (index === -1) {
    return res.json({
      error: "That post does not exist", 
    });
  }

  if (!(posts[index].writer === userId)) {
    return res.json({
      error: "Cannot delete post",
    });
  }

  posts = posts.filter((post) => post.writer !== userId);
  res.json({
    data: "Successfully deleted",
  });
  //console.log(typeof postId); -> json형태로 받아오면 string임


});




export default router;
