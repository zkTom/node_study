// 数字枚举
// Up使用初始化为 1。 其余的成员会从 1开始自动增长
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
// 字符串枚举
// 字符串枚举没有自增长的行为，字符串枚举可以很好的序列化
enum LetterDirection {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}