import { Router } from "express";

const router = Router();

let id_index = 2;

let user_data = [ 
    {  //user_data[0]
        id: 1,
        "email" : "test@email.com",
        "password" : "1234", 
    },
];

router.post("/login", (req, res) => {
    const index = user_data.findIndex(post => post.email === req.body.email & post.password === req.body.password);
    if(index === -1){
        return res.json({
            error: "User not exist",
          });
    }

    return res.json({
        data: {
            user: {
                id: user_data[index].id,
            },
        },
    });

});


router.post("/register", (req, res) => {
        const { email } = req.body;
        const { password } = req.body;
        const postCount = user_data.push({
            id: id_index++,
            email,
            password,
        });

        return res.json({
            data: {
                user: {
                    id: postCount,
                }
            }
        });

});






export default router;