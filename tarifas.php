<?php
   include_once '../index.php';

?>



<!DOCTYPE html>
<html lang="es">
    <head>
        <title>AlasGT-Tarifas</title>
        <link rel="shortcut icon" href="../assets/images/Logotipo sin fondo.png" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap-grid.css" type="text/css">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap-grid.css.map" type="text/css">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap-grid.min.css" type="text/css">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap-grid.min.css.map" type="text/css">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap-reboot.css" type="text/css">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap-reboot.css.map" type="text/css">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap-reboot.min.css" type="text/css">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap-reboot.min.css.map" type="text/css">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap.css" type="text/css">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap.css.map" type="text/css">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css" type="text/css">
        <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css.map" type="text/css">
        <link rel="stylesheet" href="../css/tarifas.css" type="text/css">
        <link rel="stylesheet" href="../css/tarifas2.css" type="text/css">
        <link rel="stylesheet" href="../css/footer.css" type="text/css">
        <link rel="stylesheet" href="../css/footer2.css" type="text/css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

    </head>
    <body>     
    <div class="imagen_derecha">
                <img src="../assets/images/nube derecha.png" class="img-fluid" >
        </div> 
        <div class="imagen_izquierda">
                    <img src="../assets/images/nube izquierda.png" class="img-fluid" >
        </div>
        <header style="padding: 0;">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark menu">
                <a class="" style="padding-left: 10px;" href="#">
                    <img src="../assets/images/Logotipo sin fondo.png" width="75px" height="50" alt="">
                </a>
                <a class="navbar-brand" style="padding-left:10px" href="#"><?php echo $usuario->getNombre() ." ".$usuario->getApellido();?></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent" style="justify-content:flex-end;">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="index.php?a=inicio">Inicio<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="index.php?a=chat">Dudas o Inconvenientes(Chat)</a>
                        </li>
                    </ul>
                    
                </div>
            </nav>
        </header>
        <section>
            <div class="centrado">
                <h1 class="titulos" style="text-align: center;">Conoce Nuestras Tarifas</h1>
            </div>
            <div class="col-lg-12 col-md-12 col-xs-12 row centrado" style="margin-right: 0; margin-left:0">
                <div class="col-lg-9 col-md-9 col-xs-9 galeria row">
                    <?php
                        $folder_path = '../assets/images/tarifas/'; 

                        $num_files = glob($folder_path . "*.{JPG,jpg,gif,png,bmp,jpeg}", GLOB_BRACE);

                        $folder = opendir($folder_path);
                        
                        if($num_files > 0){
                            while(false !== ($file = readdir($folder))) {

                                $file_path = $folder_path.$file;
                                $extension = strtolower(pathinfo($file ,PATHINFO_EXTENSION));
                                $nombre = basename($file_path,'.'.$extension);
                                if($extension=='jpg' || $extension =='png' || $extension == 'gif' || $extension == 'bmp' || $extension == 'jpeg') {
                                    ?>  
                                        <div class="columna col-lg-4 col-md-12 col-xs-12 centrado" id="columna" onclick="galeria('<?php echo $nombre.'.'.$extension; ?>');">
                                            <div class="contenedor">
                                                
                                                <img class="img-fluid imagen-activado" id="imagenTarifa" name="imagenTarifa" src="<?php echo $file_path; ?>">
                                                <div class="texto-imagen-activado">
                                                    <span class="fuentes text">¡Toca para Ver!</span>
                                                </div>
                                                <div style="text-align: center;">
                                                    <span class="fuentes texto"><?php  echo $nombre;  ?></span>
                                                </div>
                                            </div>
                                        </div>
                                    <?php
                                }
                            }
                        }else{
                            echo "the folder was empty !";
                        }
                        closedir($folder);
                    ?>
                    
                    
                </div>
            </div>
        </section>
        <footer id="dk-footer" class="dk-footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-lg-4">
                        <div class="dk-footer-box-info">
                            <a href="index.html" class="footer-logo">
                                <img style="width:90% !important" class="img-fluid imagen" src="../assets/images/img3.png">
                            </a>
                            <p class="footer-info-text">
                                Nos dedicamos a entregar todos tus paquetes en el menor tiempo posible
                            </p>
                            <div class="footer-social-link">
                                <h3>Siguenos:</h3>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-8">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="contact-us contact-us-last">
                                    <div class="contact-icon">
                                        <i class="fa fa-truck"></i>
                                    </div>
                                    <!-- End contact Icon -->
                                    <div class="contact-info">
                                        <h3>Entrega Rápida</h3>
                                        <p>Tu entrega en el menor timepo posible</p>
                                    </div>
                                    <!-- End Contact Info -->
                                </div>
                                <!-- End Contact Us -->
                            </div>
                            <!-- End Col -->
                            <div class="col-md-6">
                                <div class="contact-us contact-us-last">
                                    <div class="contact-icon">
                                        <i class="fa fa-lock"></i>
                                    </div>
                                    <!-- End contact Icon -->
                                    <div class="contact-info">
                                        <h3>Seguridad</h3>
                                        <p>Tu Envío con seguridad</p>
                                    </div>
                                    <!-- End Contact Info -->
                                </div>
                                <!-- End Contact Us -->
                            </div>
                            <!-- End Col -->
                        </div>
                        <!-- End Contact Row -->
                        <div class="row">
                            <div class="col-md-12 col-lg-6">
                                <div class="footer-widget">
                                <div class="contact-us contact-us-last">
                                    <div class="contact-icon">
                                        <i class="fa fa-volume-control-phone" aria-hidden="true"></i>
                                    </div>
                                    <!-- End contact Icon -->
                                    <div class="contact-info">
                                        <h3>Confianza</h3>
                                        <p>Tu paquete está en las mejores manos</p>
                                    </div>
                                    <!-- End Contact Info -->
                                </div>
                                <div class="contact-us contact-us-last">
                                    <div class="contact-icon">
                                        <i class="fa fa-facebook" aria-hidden="true"></i>
                                    </div>
                                    <!-- End contact Icon -->
                                    <div class="contact-info">
                                        <h3>Contactanos:</h3>
                                        <p>AlasGt</p>
                                    </div>
                                    <!-- End Contact Info -->
                                </div>
                                </div>
                                <!-- End Footer Widget -->
                            </div>
                            <!-- End col -->
                            <div class="col-md-12 col-lg-6">
                                <div class="footer-widget">
                                    <div class="contact-us contact-us-last">
                                        <div class="contact-icon">
                                            <i class="fa fa-key"></i>
                                        </div>
                                        <!-- End contact Icon -->
                                        <div class="contact-info">
                                            <h3>Respeto</h3>
                                            <p>Colaboradores con el mayor respeto a nuestros clientes</p>
                                        </div>
                                        <!-- End Contact Info -->
                                    </div>
                                <div class="contact-us contact-us-last">
                                    <div class="contact-icon">
                                        <i class="fa fa-envelope" aria-hidden="true"></i>
                                    </div>
                                    <!-- End contact Icon -->
                                    <div class="contact-info">
                                        <h3>Contactanos:</h3>
                                        <p>mensajeria@alasgt.com</p>
                                    </div>
                                    <!-- End Contact Info -->
                                </div>
                                </div>
                                <!-- End footer widget -->
                            </div>
                            <!-- End Col -->
                        </div>
                        <!-- End Row -->
                    </div>
                    <!-- End Col -->
                </div>
                <!-- End Widget Row -->
            </div>
            <!-- End Contact Container -->


            <div class="copyright">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <span>Copyright © AlasGT</span>
                        </div>
                        
                    </div>
                    <!-- End Row -->
                </div>
                <!-- End Copyright Container -->
            </div>
            <!-- End Copyright -->
            <!-- Back to top -->
           
            <!-- End Back to top -->
        </footer>   
        <div onclick="preview();" class="desactivado" id="preview">

        </div>
        <script>
        function galeria(url){
                console.log(url);
                document.getElementById('preview').classList.remove('desactivado');
                document.getElementById('preview').classList.add('activado');
                document.getElementById('preview').innerHTML = '<img class="img-fluid" style="height:100%;margin: auto; display:flex" src="../assets/images/tarifas/'+url+'">';
            }

            function preview(){
                document.getElementById('preview').classList.remove('activado');
                document.getElementById('preview').classList.add('desactivado');
            }
        </script>
    </body>
    
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</html>