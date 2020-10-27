$(function() {
    $('#link_reg').on('click', function() {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#link_login').on('click', function() {
            $('.login_box').show()
            $('.reg_box').hide()
        })
        // 自定义校验规则
    var form = layui.form
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            repwd: function(value) {
                var pwd = $('.reg_box [name = password]').val()
                if (pwd !== value) {
                    return alert('两次密码输入不一致')
                }
            }
        })
        // 登录表单绑定事件

    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})