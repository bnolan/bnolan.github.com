var b = [[1, -1, -1], [ - 1, -1, -1], [1, 1, -1], [ - 1, 1, -1], [ - 1, 1, 1], [ - 1, -1, -1], [ - 1, -1, 1], [1, -1, -1], [1, -1, 1], [1, 1, -1], [1, 1, 1], [ - 1, 1, 1], [1, -1, 1], [ - 1, -1, 1]];
s1 = [];
t = 0;
m = Math;
j = 500;
l = j / 2;
function f(d, e) {
    return d[1] - e[1]
}
function g(d, e) {
    return [d[0], m.sin(e) * d[1] - m.cos(e) * d[2], m.cos(e) * d[1] + m.sin(e) * d[2]]
}
function h() {
    w = document.getElementById("c");
    w.width = w.height = j;
    c = w.getContext("2d");
    c.fillRect(0, 0, j, j);
    for (i = 0; i < b.length; i++) {
        var d;
        d = g([g([b[i][0], b[i][1], b[i][2]], t)[1], g([b[i][0], b[i][1], b[i][2]], t)[0], g([b[i][0], b[i][1], b[i][2]], t)[2]], t);
        d = [d[0] + 0, d[1] + 0, d[2] + 0];
        b[i] = [b[i][0], b[i][1], b[i][2], d[0] * (j / (d[2] - 5)), d[1] * (j / (d[2] - 5)), d[2]]
    }
    for (i = 0; i < b.length - 2; i++) s1[i] = [i, m.min(b[i][5], m.min(b[i + 1][5], b[i + 2][5]))];
    s1.sort(f);
    for (i = 0; i < s1.length; i++) {
        c.beginPath();
        for (a = s1[i][0]; a < s1[i][0] + 3 && b.length >= s1[i][0] + 3; a++) a == s1[i][0] ? c.moveTo(b[a][3] + l, b[a][4] + l) : c.lineTo(b[a][3] + l, b[a][4] + l);
        c.closePath();
        c.fillStyle = "rgba(" + (80 + i * 3) + "," + (54 + i * 3) + "," + (l + i * 3) + ",.99)";
        c.fill()
    }
    t = (t + m.PI / 100) % (m.PI * 2);
    setTimeout(h, 22)
}
h();