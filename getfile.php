<?php 
function get_file($url, $folder = "./") { 
    set_time_limit (24 * 60 * 60); // 设置超时时间 
    $destination_folder = $folder . '/'; // 文件下载保存目录，默认为当前文件目录 
    if (!is_dir($destination_folder)) { // 判断目录是否存在 
            mkdirs($destination_folder); // 如果没有就建立目录 
    }  
    $newfname = $destination_folder . basename($url); // 取得文件的名称 
    $file = fopen ($url, "rb"); // 远程下载文件，二进制模式 
    if ($file) { // 如果下载成功 
            $newf = fopen ($newfname, "wb"); // 远在文件文件 
        if ($newf) // 如果文件保存成功 
            while (!feof($file)) { // 判断附件写入是否完整 
                fwrite($newf, fread($file, 1024 * 8), 1024 * 8); // 没有写完就继续 
        }  
    }  
    if ($file) { 
        fclose($file); // 关闭远程文件 
    }  
    if ($newf) { 
        fclose($newf); // 关闭本地文件 
    }  
    return true; 
}  

function mkdirs($path , $mode = "0755") { 
    if (!is_dir($path)) { // 判断目录是否存在 
            mkdirs(dirname($path), $mode); // 循环建立目录   
        mkdir($path, $mode); // 建立目录 
    }  
    return true; 
}  
// 使用示例 http://www.ienglishtest.com/
//echo get_file('http://www.kalvin.cn/index.php'); 
//echo get_file('http://www.vocabularycard.com/puredata/sound/de/Depletion.wav','./sound'); 
?> 