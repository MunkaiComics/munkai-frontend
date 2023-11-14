const { API_URL } = require("config/constants");

export function getFileUrl(key) {
    return `${API_URL}/file/${key}`;
}