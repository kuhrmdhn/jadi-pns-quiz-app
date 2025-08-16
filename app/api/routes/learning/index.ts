import { Hono } from "hono";
import getLearningTopicContent from "./utils/getLearningTopicContent";
import { getLearningTopics } from "./utils/getLearningTopics";

const learning = new Hono()

learning.onError((err, c) => {
    const error = err as Error
    console.error(error);
    return c.json({ message: error.message }, 500)
})

learning.get("/topics/:category", async (c) => {
    try {
        const { category } = c.req.param()
        const topics = await getLearningTopics(category)
        return c.json({ success: true, data: { topics }, message: "Success get learning category list(s)" })
    } catch (err) {
        const error = err as Error
        console.error(error);
        return c.json({ success: false, message: `Internal server error. ${error.message}` }, 500)
    }
})

learning.get("/topics/:category/:topic", async (c) => {
    try {
        const { category, topic } = c.req.param()
        const content = await getLearningTopicContent(category, topic)
        return c.json({ success: true, data: { content }, message: `Success get ${topic} content`},200)
    } catch (err) {
        const error = err as Error
        console.error(error);
        return c.json({ success: false, message: `Internal server error. ${error.message}` }, 500)
    }
})

export default learning