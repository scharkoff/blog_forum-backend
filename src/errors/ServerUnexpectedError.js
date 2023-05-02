export default function ServerUnexpectedError(res) {
  return res.status(500).json({
    message: 'Произошла непредвиденная серверная ошибка',
  });
}