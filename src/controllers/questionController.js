const { Question } = require("../models/question.js");

const questionController = {
    //ADD A Question
    create_question: (req, res) => {
        try {
            Question.findOne({})
                .sort({ _id: 'desc' })
                .then(lastQuestion => {
                    if (lastQuestion) {
                        req.body._id = lastQuestion._id + 1;
                        const newQuestion = new Question(req.body);
                        newQuestion
                            .save()
                            .then(() => res.status(200).json(newQuestion))
                    } else {
                        req.body._id = 1
                        const newQuestion = new Question(req.body);
                        newQuestion
                            .save()
                            .then(() => res.status(200).json(newQuestion))
                    }

                })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getQuestion: async (req, res) => {
        let question = req.query.question;
        let date = req.query.date;
        let part = req.query.part;
        let subject = req.query.subject;
        let page = req.query.page;
        let limit = req.query.limit;
        //pagination
        if (page != null && limit != null && question == null && date == null && part == null && subject == null) {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            try {
                const getQuestion = await Question.find();
                return res.status(200).json({
                    message: 'ok',
                    data: getQuestion.slice(startIndex, endIndex)
                })
            } catch (error) {
                return res.status(404).json({
                    message: error,
                })
            }
        }
        //search question 
        else if (question != null && subject != null && part != null && page != null && limit != null && date == null) {
            try {
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
                const detail = await Question.find({ $and: [{ subject: subject }, { part: part }, { question: { $regex: question, $options: 'i' } }] });
                // const detail = await pool.execute(`SELECT * FROM subject where question like '%${question}%' and subject = ? and part = ?`, [subject, part]);
                return res.status(200).json({
                    message: 'ok',
                    data: detail.slice(startIndex, endIndex)
                })
            } catch (error) {
                return res.status(404).json({
                    message: error,
                })
            }
        }
        else if (date != null && question == null && part == null && subject == null) {
            try {
                const detailDate = await Question.find({ $and: [{ date: date }] });
                return res.status(200).json({
                    message: 'ok',
                    data: detailDate
                })
            } catch (error) {
                return res.status(404).json({
                    message: error,
                })
            }
        }
        else if (subject != null && date == null && question == null && part == null) {
            try {
                const detailSubject = await Question.find({ $and: [{ subject: subject }] });
                return res.status(200).json({
                    message: 'ok',
                    data: detailSubject
                })
            } catch (error) {
                return res.status(404).json({
                    message: error,
                })
            }
        }
        else if (subject != null && part != null && page == null && limit == null && date == null && question == null) {
            try {
                const detailPartSubject = await Question.find({ $and: [{ subject: subject }, { part: part }] });
                return res.status(200).json({
                    message: 'ok',
                    data: detailPartSubject
                })
            } catch (error) {
                return res.status(404).json({
                    message: error,
                })
            }
        }
        else if (subject != null && part != null && page != null && limit != null && date == null && question == null) {
            try {
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
                const detailSubject = await Question.find({ $and: [{ subject: subject }, { part: part }] });
                return res.status(200).json({
                    message: 'ok',
                    data: detailSubject.slice(startIndex, endIndex)
                })
            } catch (error) {
                return res.status(404).json({
                    message: error,
                })
            }
        }
        else if (date != null && part != null && question == null && subject == null) {
            try {
                const detailQuestionToday = await Question.find({ $and: [{ date: date }, { part: part }] });
                return res.status(200).json({
                    message: 'ok',
                    data: detailQuestionToday
                })
            } catch (error) {
                return res.status(404).json({
                    message: error,
                })
            }
        }
        else if (date != null && part != null && question == null && subject != null) {
            try {
                const detailQuestionToday = await Question.find({ $and: [{ date: date }, { part: part }, { subject: subject }] });
                return res.status(200).json({
                    message: 'ok',
                    data: detailQuestionToday
                })
            } catch (error) {
                return res.status(404).json({
                    message: error,
                })
            }
        }

    },

    update_question: async (req, res) => {
        try {
            const question = await Question.findById(req.params.id);
            await question.updateOne({ $set: req.body });
            res.status(200).json({
                message: "update succesfully",
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    delete_question: async (req, res) => {
        try {
            // const conversation = await Conversations.findById(req.params.id);
            await Question.findById(req.params.id).deleteMany();
            res.status(200).json("delete successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = questionController;