
//存放量角器
var AngleXY0 = [];
var AngleXY1 = [];
var AngleXY2 = [];

function angle() {
    if (BL_mode == 'angle') {
        DeleteMouseEvent();
        //this.angle_=1;
        //cancelTools();
        document.documentElement.onmousemove = displayAngleLabel;
        document.documentElement.ontouchmove = displayAngleLabel;
        openAngle = 0;
        angle.angle_ = 1;
        set_BL_model.onchange1 = function () {
            getByid("AngleLabel").style.display = "none";
            displayMark();
            angle.angle_ = false;
            // document.documentElement.onmousemove = DivDraw;
            // document.documentElement.ontouchmove = DivDraw;
            set_BL_model.onchange1 = function () { return 0; };
        }
        Mousedown = function (e) {
            if (e.which == 1) MouseDownCheck = true;
            else if (e.which == 3) rightMouseDown = true;

            windowMouseX = GetmouseX(e);
            windowMouseY = GetmouseY(e);
            GetViewport().originalPointX = getCurrPoint(e)[0];
            GetViewport().originalPointY = getCurrPoint(e)[1];
            angle_pounch(getCurrPoint(e)[0], getCurrPoint(e)[1]);
            Angle_previous_choose = null;
            if (Angle_now_choose) return;
            if (angle.angle_ == 3) angle.angle_ = 1;
            //if (angle.angle_ == 2) getByid("AngleLabel").style.display = '';

            if (angle.angle_ == 1) {
                let angle2point = rotateCalculation(e);
                AngleXY0 = angle2point;
                AngleXY1 = angle2point;
                for (var i = 0; i < Viewport_Total; i++)
                    displayMark(i);
                displayAngleRuler();
            }
        };

        Mousemove = function (e) {
            var currX = getCurrPoint(e)[0];
            var currY = getCurrPoint(e)[1];
            var labelXY = getClass('labelXY'); {
                let angle2point = rotateCalculation(e);
                labelXY[viewportNumber].innerText = "X: " + parseInt(angle2point[0]) + " Y: " + parseInt(angle2point[1]);
            }
            if (rightMouseDown == true) {
                scale_size(e, currX, currY);
            }
            if (angle.angle_ == 2) {
                let angle2point = rotateCalculation(e);
                AngleXY2 = angle2point;
                var dcm = {};
                dcm.study = GetViewport().study;
                dcm.series = GetViewport().series;
                dcm.sop = GetNewViewport().sop;
                dcm.color = "#FF0000";
                dcm.mark = [];
                dcm.showName = "ruler";
                dcm.hideName = dcm.showName;
                dcm.mark.push({});
                //dcm.hideMark = function () { getClass("MeasureLabel").style.display = "none"; };
                //dcm.displayMark = function () { getClass("MeasureLabel").style.display = ""; };
                var DcmMarkLength = dcm.mark.length - 1;
                dcm.mark[DcmMarkLength].type = "AngleRuler";
                dcm.mark[DcmMarkLength].markX = [];
                dcm.mark[DcmMarkLength].markY = [];
                dcm.mark[DcmMarkLength].markX.push(GetViewport().originalPointX);
                dcm.mark[DcmMarkLength].markY.push(GetViewport().originalPointY);

                dcm.mark[DcmMarkLength].markY.push(AngleXY1[1]);
                dcm.mark[DcmMarkLength].markX.push(AngleXY1[0]);
                dcm.mark[DcmMarkLength].markY.push(AngleXY0[1]);
                dcm.mark[DcmMarkLength].markX.push(AngleXY0[0]);
                dcm.mark[DcmMarkLength].markY.push(AngleXY2[1]);
                dcm.mark[DcmMarkLength].markX.push(AngleXY2[0]);

                dcm.mark[DcmMarkLength].Text = getAnglelValue(e);
                PatientMark.push(dcm);
                refreshMark(dcm);
                for (var i = 0; i < Viewport_Total; i++)
                    displayMark(i);
                PatientMark.splice(PatientMark.indexOf(dcm), 1);
                //displayAngleRuler();
                //return;
            }

            if (openLink == true) {
                for (var i = 0; i < Viewport_Total; i++) {
                    GetViewport(i).newMousePointX = GetViewport().newMousePointX;
                    GetViewport(i).newMousePointY = GetViewport().newMousePointY;
                }
            }
            putLabel();
            for (var i = 0; i < Viewport_Total; i++)
                displayRuler(i);

            if (MouseDownCheck) {
                windowMouseX = GetmouseX(e);
                windowMouseY = GetmouseY(e);
                if (angle.angle_ == 1) {
                    let angle2point = rotateCalculation(e);
                    AngleXY1 = angle2point;

                    var dcm = {};
                    dcm.study = GetViewport().study;
                    dcm.series = GetViewport().series;
                    dcm.sop = GetNewViewport().sop;
                    dcm.color = "#FF0000";
                    dcm.mark = [];
                    dcm.showName = "ruler";
                    dcm.hideName = dcm.showName;
                    dcm.mark.push({});
                   
                    //dcm.hideMark = function () { getClass("MeasureLabel").style.display = "none"; };
                    //dcm.displayMark = function () { getClass("MeasureLabel").style.display = ""; };
                    var DcmMarkLength = dcm.mark.length - 1;
                    dcm.mark[DcmMarkLength].type = "AngleRuler";
                    dcm.mark[DcmMarkLength].markX = [];
                    dcm.mark[DcmMarkLength].markY = [];
                    dcm.mark[DcmMarkLength].markX.push(GetViewport().originalPointX);
                    dcm.mark[DcmMarkLength].markY.push(GetViewport().originalPointY);
                    dcm.mark[DcmMarkLength].markY.push(AngleXY1[1]);
                    dcm.mark[DcmMarkLength].markX.push(AngleXY1[0]);
                    dcm.mark[DcmMarkLength].markY.push(AngleXY0[1]);
                    dcm.mark[DcmMarkLength].markX.push(AngleXY0[0]);

                    dcm.mark[DcmMarkLength].Text = "";//getAnglelValue(e);
                    PatientMark.push(dcm);
                    refreshMark(dcm);

                    for (var i = 0; i < Viewport_Total; i++)
                        displayMark(i);
                    PatientMark.splice(PatientMark.indexOf(dcm), 1);
                    //return;
                }
                if (Angle_now_choose) {
                    Angle_now_choose.mark.markX[Angle_now_choose.order] = currX;
                    Angle_now_choose.mark.markY[Angle_now_choose.order] = currY;
                    Angle_now_choose.mark.markX[3] = Angle_now_choose.mark.markX[0];
                    Angle_now_choose.mark.markY[3] = Angle_now_choose.mark.markY[0];
                    Angle_now_choose.mark.Text = getAnglelValueBy2Point(Angle_now_choose.mark);
                    refreshMark(Angle_now_choose.dcm);
                    //PatientMark.splice(PatientMark.indexOf(Angle_now_choose.dcm), 1);
                    return;
                }
            }
            GetViewport().originalPointX = currX;
            GetViewport().originalPointY = currY;
        }
        Mouseup = function (e) {
            if (openMouseTool == true && rightMouseDown == true)
                displayMark();

            if (Angle_now_choose) {
                Angle_now_choose.mark.markX[Angle_now_choose.order] = getCurrPoint(e)[0];
                Angle_now_choose.mark.markY[Angle_now_choose.order] = getCurrPoint(e)[1];
                Angle_now_choose.mark.markX[3] = Angle_now_choose.mark.markX[0];
                Angle_now_choose.mark.markY[3] = Angle_now_choose.mark.markY[0];
                Angle_now_choose.mark.Text = getAnglelValueBy2Point(Angle_now_choose.mark);
                refreshMark(Angle_now_choose.dcm);
                angle.angle_ = 3;
            }
            if (angle.angle_ == 2) {
                let angle2point = rotateCalculation(e);
                AngleXY2 = angle2point;
                
                var dcm = {};
                dcm.study = GetViewport().study;
                dcm.series = GetViewport().series;
                dcm.sop = GetNewViewport().sop;
                dcm.color = "#FF0000";
                dcm.mark = [];
                dcm.showName = "ruler";
                dcm.hideName = dcm.showName;
                dcm.mark.push({});
               
                /*dcm.hideMark = function () {
                    for (var m = 0; m < getClass("AngleLabel" + dcm.sop).length; m++)
                        getClass("AngleLabel" + dcm.sop)[m].style.display = "none";
                }
                dcm.displayMark = function () {
                    for (var m = 0; m < getClass("AngleLabel" + dcm.sop).length; m++)
                        getClass("AngleLabel" + dcm.sop)[m].style.display = "";
                }
                dcm.deleteMark = function () {
                    var AngleLabelClass = getClass("AngleLabel" + dcm.sop);
                    for (var m = 0; m < AngleLabelClass.length; m++) {
                        AngleLabelClass[m].remove();
                    }
                }*/
                //dcm.hideMark = function () { getClass("MeasureLabel").style.display = "none"; };
                //dcm.displayMark = function () { getClass("MeasureLabel").style.display = ""; };
                var DcmMarkLength = dcm.mark.length - 1;
                dcm.mark[DcmMarkLength].type = "AngleRuler";
                dcm.mark[DcmMarkLength].markX = [];
                dcm.mark[DcmMarkLength].markY = [];
                dcm.mark[DcmMarkLength].markX.push(GetViewport().originalPointX);
                dcm.mark[DcmMarkLength].markY.push(GetViewport().originalPointY);

                dcm.mark[DcmMarkLength].markY.push(AngleXY1[1]);
                dcm.mark[DcmMarkLength].markX.push(AngleXY1[0]);
                dcm.mark[DcmMarkLength].markY.push(AngleXY0[1]);
                dcm.mark[DcmMarkLength].markX.push(AngleXY0[0]);
                dcm.mark[DcmMarkLength].markY.push(AngleXY2[1]);
                dcm.mark[DcmMarkLength].markX.push(AngleXY2[0]);

                dcm.mark[DcmMarkLength].Text = getAnglelValue(e);
                PatientMark.push(dcm);
                refreshMark(dcm);
                for (var i = 0; i < Viewport_Total; i++)
                    displayMark(i);
                //PatientMark.splice(PatientMark.indexOf(dcm), 1);
                //displayAngleRuler();
                //return;
                Angle_previous_choose = dcm;
            }
            if (MouseDownCheck == true) {
                if (angle.angle_ == 1) angle.angle_ = 2;
                else if (angle.angle_ == 2) angle.angle_ = 3;
            }
            if (Angle_now_choose) Angle_previous_choose = Angle_now_choose;
            Angle_now_choose = null;
            MouseDownCheck = false;
            rightMouseDown = false;
        }
        Touchstart = function (e, e2) {

            if (!e2) TouchDownCheck = true;
            else rightTouchDown = true;
            windowMouseX = GetmouseX(e);
            windowMouseY = GetmouseY(e);
            if (rightTouchDown == true && e2) {
                windowMouseX2 = GetmouseX(e2);
                windowMouseY2 = GetmouseY(e2);
            }
            GetViewport().originalPointX = getCurrPoint(e)[0];
            GetViewport().originalPointY = getCurrPoint(e)[1];
            if (rightTouchDown == true && e2) {
                GetViewport().originalPointX2 = getCurrPoint(e2)[0];
                GetViewport().originalPointY2 = getCurrPoint(e2)[1];
            }
            if (angle.angle_ == 3) angle.angle_ = 1;
            if (angle.angle_ == 2) getByid("AngleLabel").style.display = '';
            if (angle.angle_ == 1) {
                let angle2point = rotateCalculation(e);
                var currX11 = angle2point[0];
                var currY11 = angle2point[1];

                AngleXY0 = [currX11, currY11];
                AngleXY1 = [currX11, currY11];
                for (var i = 0; i < Viewport_Total; i++)
                    displayMark(i);
                displayAngleRuler();
            }
        }
        Touchmove = function (e, e2) {
            if (openDisplayMarkup && (getByid("DICOMTagsSelect").selected || getByid("AIMSelect").selected)) return;

            var currX = getCurrPoint(e)[0];
            var currY = getCurrPoint(e)[1];
            if (e2) {
                var currX2 = getCurrPoint(e2)[0];
                var currY2 = getCurrPoint(e2)[1];
            }
            var labelXY = getClass('labelXY');
            labelXY[viewportNumber].innerText = "X: " + Math.floor(currX) + " Y: " + Math.floor(currY);
            if (angle.angle_ == 2) {
                let angle2point = rotateCalculation(e);
                var currX11 = angle2point[0];
                var currY11 = angle2point[1];
                AngleXY2 = [currX11, currY11];
                for (var i = 0; i < Viewport_Total; i++)
                    displayMark(i);
                displayAngleRuler();
                return;
            }
            if (angle.angle_ == 1) {
                // AngleXY0 = [getCurrPoint(e)[0], getCurrPoint(e)[1]];
                let angle2point = rotateCalculation(e);
                var currX11 = angle2point[0];
                var currY11 = angle2point[1];
                AngleXY0 = [currX11, currY11];
                for (var i = 0; i < Viewport_Total; i++)
                    displayMark(i);
                displayAngleRuler();
                return;
            }
        }
        Touchend = function (e, e2) {
            if (TouchDownCheck == true) {
                if (angle.angle_ == 1) angle.angle_ = 2;
                else if (angle.angle_ == 2) angle.angle_ = 3;
            }
            TouchDownCheck = false;
            rightTouchDown = false;

            magnifierDiv.hide();

        }
        AddMouseEvent();
    }
}

var Angle_now_choose = null;
var Angle_previous_choose = null;
function angle_pounch(currX, currY) {
    let block_size = getMarkSize(GetViewportMark(), false) * 4;
    let index = SearchUid2Index(GetNewViewport().sop);
    let i = index[0],
        j = index[1],
        k = index[2];
    for (var n = 0; n < PatientMark.length; n++) {
        if (PatientMark[n].sop == Patient.Study[i].Series[j].Sop[k].SopUID) {
            for (var m = 0; m < PatientMark[n].mark.length; m++) {
                if (PatientMark[n].mark[m].type == "AngleRuler") {
                    var tempMark = PatientMark[n].mark[m];
                    var x1 = parseInt(tempMark.markX[0]);
                    var y1 = parseInt(tempMark.markY[0]);

                    PatientMark[n].mark[m].markX[0];
                    if (currY + block_size >= y1 && currY - block_size <= y1 && currX + block_size >= x1 && currX - block_size <= x1) {
                        Angle_now_choose = { dcm: PatientMark[n], mark: PatientMark[n].mark[m], order: 0 };
                    }

                    var x2 = parseInt(tempMark.markX[1]);
                    var y2 = parseInt(tempMark.markY[1]);
                    if (currY + block_size >= y2 && currY - block_size <= y2 && currX + block_size >= x2 && currX - block_size <= x2) {
                        Angle_now_choose = { dcm: PatientMark[n], mark: PatientMark[n].mark[m], order: 1 };
                    }

                    var x3 = parseInt(tempMark.markX[2]);
                    var y3 = parseInt(tempMark.markY[2]);
                    if (currY + block_size >= y3 && currY - block_size <= y3 && currX + block_size >= x3 && currX - block_size <= x3) {
                        Angle_now_choose = { dcm: PatientMark[n], mark: PatientMark[n].mark[m], order: 2 };
                    }
                    /*if (currY + block_size >= y1 && currX + block_size >= x1 / 2 + x2 / 2 && currY < y1 + block_size && currX < x1 / 2 + x2 / 2 + block_size) {

                    }*/

                }
            }
        }
    }
}

function drawAngleRuler(obj) {
    var canvas = obj.canvas, mark = obj.mark;
    if (mark.type != "AngleRuler") return;
    var ctx = canvas.getContext("2d");
    ctx.globalAlpha = (parseFloat(getByid('markAlphaText').value) / 100);
    setMarkColor(ctx);

    var tempAlpha2 = ctx.globalAlpha;
    ctx.globalAlpha = 1.0;
    ctx.beginPath();
    ctx.strokeStyle = "#00FF00";
    ctx.fillStyle = "#00FF00";

    ctx.moveTo(mark.markX[0], mark.markY[0]);
    ctx.lineTo(mark.markX[1], mark.markY[1]);
    ctx.stroke();
    if (mark.markX.length > 2) {
        ctx.moveTo(mark.markX[1], mark.markY[1]);
        ctx.lineTo(mark.markX[2], mark.markY[2]);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle = "#FF0000";
    ctx.arc(mark.markX[0], mark.markY[0], 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(mark.markX[1], mark.markY[1], 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    if (mark.markX.length > 2) {
        ctx.strokeStyle = "#FF0000";
        ctx.fillStyle = "#FF0000";
        ctx.arc(mark.markX[1], mark.markY[1], 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.arc(mark.markX[2], mark.markY[2], 3, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.closePath();

    if (mark.Text) {
        ctx.beginPath();
        ctx.font = "" + (22) + "px Arial";
        ctx.fillStyle = "#FF0000";
        ctx.fillText("" + mark.Text, mark.markX[mark.markX.length - 1], mark.markY[mark.markY.length - 1]);
        ctx.closePath();
    }
    ctx.globalAlpha = tempAlpha2;
}
PLUGIN.PushMarkList(drawAngleRuler);
function displayAngleRuler() {
    return;
    if (!angle.angle_) return;
    if (parseInt(Math.sqrt(
        Math.pow(AngleXY1[0] / GetNewViewport().transform.PixelSpacingX - AngleXY0[0] / GetNewViewport().transform.PixelSpacingX, 2) +
        Math.pow(AngleXY1[1] / GetNewViewport().transform.PixelSpacingY - AngleXY0[1] / GetNewViewport().transform.PixelSpacingY, 2), 2)) <= 0) return;

    var MarkCanvas = GetViewportMark();
    var tempctx = MarkCanvas.getContext("2d");

    var lineWid = parseFloat(MarkCanvas.width) / parseFloat(Css(MarkCanvas, 'width'));

    if (lineWid <= 0) lineWid = parseFloat(Css(MarkCanvas, 'width')) / parseFloat(MarkCanvas.width);
    if (lineWid <= 1.5) lineWid = 1.5;

    tempctx.lineWidth = "" + ((Math.abs(lineWid)) * 1);

    tempctx.beginPath();
    tempctx.strokeStyle = "#00FF00";
    tempctx.fillStyle = "#00FF00";

    tempctx.moveTo(AngleXY0[0], AngleXY0[1]);
    tempctx.lineTo(AngleXY1[0], AngleXY1[1]);
    tempctx.stroke();
    if (angle.angle_ == 2) {
        tempctx.moveTo(AngleXY0[0], AngleXY0[1]);
        tempctx.lineTo(AngleXY2[0], AngleXY2[1]);
    }
    tempctx.stroke();
    tempctx.closePath();
    tempctx.beginPath();
    tempctx.strokeStyle = "#FF0000";
    tempctx.fillStyle = "#FF0000";
    tempctx.arc(AngleXY0[0], AngleXY0[1], 3, 0, 2 * Math.PI);
    tempctx.fill();

    tempctx.arc(AngleXY1[0], AngleXY1[1], 3, 0, 2 * Math.PI);
    tempctx.fill();
    if (angle.angle_ == 2) {
        tempctx.strokeStyle = "#FF0000";
        tempctx.fillStyle = "#FF0000";
        tempctx.arc(AngleXY0[0], AngleXY0[1], 3, 0, 2 * Math.PI);
        tempctx.fill();
        tempctx.arc(AngleXY2[0], AngleXY2[1], 3, 0, 2 * Math.PI);
        tempctx.fill();
    }
    tempctx.closePath();
    //displayAngleLabel();
}

function getAnglelValueBy2Point(mark) {
    if (!angle.angle_) return;
    var getAngle = ({
        x: x1,
        y: y1
    }, {
        x: x2,
        y: y2
    }) => {
        const dot = x1 * x2 + y1 * y2
        const det = x1 * y2 - y1 * x2
        const angle = Math.atan2(det, dot) / Math.PI * 180
        return (angle + 360) % 360
    }
    var angle1 = getAngle({
        x: mark.markX[1] - mark.markX[2],
        y: mark.markY[1] - mark.markY[2],
    }, {
        x: mark.markX[1] - mark.markX[0],
        y: mark.markY[1] - mark.markY[0],
    });
    if (angle1 > 180) angle1 = 360 - angle1;
    return parseInt(angle1) + "°";
}

window.addEventListener('keydown', (KeyboardKeys) => {
    var key = KeyboardKeys.which

    if ((BL_mode == 'angle') && Angle_previous_choose && (key === 46 || key === 110)) {
        PatientMark.splice(PatientMark.indexOf(Angle_previous_choose.dcm), 1);
        displayMark();
        Angle_previous_choose = null;
        refreshMarkFromSop(GetNewViewport().sop);
    }
    Angle_previous_choose = null;
});

function getAnglelValue(e, Label) {
    if (!angle.angle_) return;
    var getAngle = ({
        x: x1,
        y: y1
    }, {
        x: x2,
        y: y2
    }) => {
        const dot = x1 * x2 + y1 * y2
        const det = x1 * y2 - y1 * x2
        const angle = Math.atan2(det, dot) / Math.PI * 180
        return (angle + 360) % 360
    }
    var angle1 = getAngle({
        x: AngleXY1[0] - AngleXY2[0],
        y: AngleXY1[1] - AngleXY2[1],
    }, {
        x: AngleXY1[0] - AngleXY0[0],
        y: AngleXY1[1] - AngleXY0[1],
    });
    if (angle1 > 180) angle1 = 360 - angle1;
    if (!Label) return parseInt(angle1) + "°";

    x_out = -parseInt(magnifierCanvas.style.width) / 2; // 與游標座標之水平距離
    y_out = -parseInt(magnifierCanvas.style.height) / 2; // 與游標座標之垂直距離
    if (angle.angle_ >= 2) {
        Label.style.display = '';
        if (AngleXY2[0] > AngleXY0[0])
            x_out = 20; // 與游標座標之水平距離
        else x_out = -20;
        if (AngleXY2[1] > AngleXY0[1])
            y_out = 20; // 與游標座標之水平距離
        else y_out = -20;
    } else {
        Label.style.display = 'none';
    }
    if (document.body.scrollTop && document.body.scrollTop != 0) {
        dbst = document.body.scrollTop;
        dbsl = document.body.scrollLeft;
    } else {
        dbst = document.getElementsByTagName("html")[0].scrollTop;
        dbsl = document.getElementsByTagName("html")[0].scrollLeft;
    }
    dgs = Label.style;
    y = e.clientY;
    x = e.clientX;
    if (!y || !x) {
        y = e.touches[0].clientY;
        x = e.touches[0].clientX;
    }
    dgs.top = y + dbst + y_out + "px";
    dgs.left = x + dbsl + x_out + "px";

    var angle1 = getAngle({
        x: AngleXY0[0] - AngleXY2[0],
        y: AngleXY0[1] - AngleXY2[1],
    }, {
        x: AngleXY0[0] - AngleXY1[0],
        y: AngleXY0[1] - AngleXY1[1],
    });
    if (angle1 > 180) angle1 = 360 - angle1;
    return parseInt(angle1) + "°";
}

function displayAngleLabel(e) {
    return;
    if (!angle.angle_) return;
    x_out = -parseInt(magnifierCanvas.style.width) / 2; // 與游標座標之水平距離
    y_out = -parseInt(magnifierCanvas.style.height) / 2; // 與游標座標之垂直距離
    if (angle.angle_ >= 2) {
        getByid("AngleLabel").style.display = '';
        if (AngleXY2[0] > AngleXY0[0])
            x_out = 20; // 與游標座標之水平距離
        else x_out = -20;
        if (AngleXY2[1] > AngleXY0[1])
            y_out = 20; // 與游標座標之水平距離
        else y_out = -20;
    } else {
        getByid("AngleLabel").style.display = 'none';
    }
    if (document.body.scrollTop && document.body.scrollTop != 0) {
        dbst = document.body.scrollTop;
        dbsl = document.body.scrollLeft;
    } else {
        dbst = document.getElementsByTagName("html")[0].scrollTop;
        dbsl = document.getElementsByTagName("html")[0].scrollLeft;
    }
    dgs = document.getElementById("AngleLabel").style;
    y = e.clientY;
    x = e.clientX;
    if (!y || !x) {
        y = e.touches[0].clientY;
        x = e.touches[0].clientX;
    }
    dgs.top = y + dbst + y_out + "px";
    dgs.left = x + dbsl + x_out + "px";
    var getAngle = ({
        x: x1,
        y: y1
    }, {
        x: x2,
        y: y2
    }) => {
        const dot = x1 * x2 + y1 * y2
        const det = x1 * y2 - y1 * x2
        const angle = Math.atan2(det, dot) / Math.PI * 180
        return (angle + 360) % 360
    }
    var angle1 = getAngle({
        x: AngleXY0[0] - AngleXY2[0],
        y: AngleXY0[1] - AngleXY2[1],
    }, {
        x: AngleXY0[0] - AngleXY1[0],
        y: AngleXY0[1] - AngleXY1[1],
    });
    if (angle1 > 180) angle1 = 360 - angle1;
    getByid("AngleLabel").innerText = parseInt(angle1) + "°";
}