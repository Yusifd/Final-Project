import {db} from "../db.js"

export const getPosts=(req,res)=>{
    const q=req.query.cat 
    ?"SELECT * FROM posts WHERE cat=? "
    :"SELECT * FROM posts";

    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.status(500).send(err)

            return res.status(200).json(data)
    })
}

export const getPost=(req,res)=>{
    const q ="SELECT p.id,`username`,`title`,`desc`,p.img, u.img AS userImg ,`cat`,`date` FROM users u JOIN posts p ON p.id WHERE p.id=?"

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err)

            return res.status(200).json(data[0])
    })
}

// Функция для добавления поста
export const addPost = (req, res) => {
    const q = "INSERT INTO posts (`title`, `desc`, `img`, `date`, `cat`) VALUES (?,?,?,?,?)";
    
    const { title, desc, img, date, cat } = req.body;
    const values = [title, desc, img, date, cat];

    console.log(req.body); // Для отладки

    db.query(q, values, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err);
        } else {
            return res.json('Post has been created');
        }
    });
};

export const deletePost=(req,res)=>{
    const postId=req.params.id
    const q="DELETE FROM posts WHERE `id`=?"
    db.query(q,[postId],(err,data)=>{
        if(err) return res.status(403).json("You can delete only your posts")

            return res.json("Post has been deleted");
    })


}
export const updatePost=(req,res)=>{
    const postId=req.params.id
    const q="UPDATE posts SET `title`=?, `desc`=?,`img`=?, `cat=?` WHERE `id`=?"
    const { title, desc,img, cat } = req.body;
    const values = [title, desc,img, cat,postId];
    console.log(req.body); // Для отладки
    

    db.query(q,values,(err,data)=>{
        if(err) return res.status(500).json(err)
            return res.json(data)
    })
}