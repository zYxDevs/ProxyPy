from fastapi import FastAPI
from fastapi.responses import Response, JSONResponse
import httpx, uvicorn


app = FastAPI()


@app.get("/proxy")
async def proxied(url: str = None):
    if not url:
        return JSONResponse(
            {
                "message": "url parameter is not found.",
                "success": False,
                "creator": "https://github.com/zYxDevs",
            },
            status_code=422,
        )
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            return Response(content=response.content, status_code=response.status_code)
    except Exception as e:
        return Response(content=str(e), status_code=500)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)
