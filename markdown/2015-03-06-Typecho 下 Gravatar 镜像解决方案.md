Typecho 默认使用 Gravatar 做头像服务，各种裂你懂的

国内的镜像暂时发现有 *v2ex* 和 *多说* 两个

立马动手，修改文件 `var/Typecho/Common.php`，从第937行开始

>
```
public static function gravatarUrl($mail, $size, $rating, $default, $isSecure = false)
    {
        $url = $isSecure ? 'https://cdn.v2ex.com/gravatar/' : 'http://gravatar.duoshuo.com/avatar/';

        if (!empty($mail)) {
            $url .= md5(strtolower(trim($mail)));
        }

        $url .= '?s=' . $size;
        $url .= '&amp;r=' . $rating;
        $url .= '&amp;d=' . $default;

        return $url;
    }
```

> 其实就是修改了 $url 而已啦...

参考：
- <https://cdn.v2ex.com/gravatar/d526d9f3785497227b1ce25be66c0b96?s=220&r=X&d=mm>
- <http://gravatar.duoshuo.com/avatar/d526d9f3785497227b1ce25be66c0b96?s=220&r=X&d=mm>