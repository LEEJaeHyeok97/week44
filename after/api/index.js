import { Router } from "express";
//import get from "./get";
import post from "./post";

const router = Router();

let nextId = 4; // movies 변수에 id를 설정합니다

let posts = [ // movies 배열
  { // movies[0]
    id: 1,
    content: 'A',
    writer: 1,
  },
  { // movies [1]
    id: 2,
    content: 'Spider-man',
    writer: 2,
  },
  { // movies [2]
    id: 3,
    content: 'Harry Potter',
    writer: 3,
  },
];


// res - 서버에서 줄 값 (응답)
//req - 서버가 요청 받은 값(요청)

router.get("/s", (req, res) => {
  const index = posts.findIndex(post => post.id === req.body.id);
  
  res.json({data: posts.filter(post => post.id === req.body.id)[0]});
});
//res.json({ data: { id: 1,}});


router.get("/", (req, res) => {
  //res.status(200).json(posts);
  res.json(posts);
});


router.post("/a", (req, res) => {
  console.log(req.body);
  posts.push({
    id: nextId++,
    content: req.body.content,
    writer: req.body.writer,
  });
  res.json(posts);
});




//글 수정
router.put("/put", (req, res) => {
  const index = posts.findIndex(post => post.id === req.body.id);
  if(index === -1){
    return res.json({
      error: "That post does not exist",
    });
  }

  posts[index] = {
    id: req.body.id,
    content: req.body.content,
    writer: req.body.writer,
  };
  res.json(posts);
})

router.delete("/del", (req, res) => {
  posts = posts.filter(post => post.id !== req.body.id);
  res.json(posts);
});




export default router;
