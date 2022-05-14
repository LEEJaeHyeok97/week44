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

//개별 항목 조회
router.get("/post", (req, res) => {
  const index = posts.findIndex(post => post.id === req.body.id);
  
  res.json({data: posts.filter(post => post.id === req.body.id)[0]});
});
//res.json({ data: { id: 1,}});


//글 목록(전체) 조회
router.get("/posts", (req, res) => {
  //res.status(200).json(posts);
  res.json(posts);
});


//글 생성
router.post("/posts", (req, res) => {
  posts.push({
    id: nextId++,
    content: req.body.content,
    writer: req.body.id,
  });
  res.json(posts);
});




//글 수정
router.put("/posts", (req, res) => {
  const index = posts.findIndex(post => post.id === req.body.id);
  if(index === -1){
    return res.json({
      error: "That post does not exist",
    });
  }

  posts[index] = {
    id: req.body.id,
    content: req.body.content,
    writer: req.body.id,
  };
  res.json(posts);
})

router.delete("/posts", (req, res) => {
  posts = posts.filter(post => post.id !== req.body.id);
  res.json(posts);
});




export default router;
