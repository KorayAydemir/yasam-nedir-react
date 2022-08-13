import bg from "./images/Yasamnedir2.jpg";
import { Link } from "react-router-dom";
import React from "react";
import classes from "./home.module.css";
import Button from "../../globals/button/button";
import octopus from "./images/ahto.png";

const Home = () => {
  return (
    <div className={classes["bg-container"]}>
      <img className={classes.bg} src={bg} alt="background" />
      <div className={classes["octopus-wrapper"]}>
        <img className={classes.octopus} src={octopus} alt="octopus" />
      </div>
      <div className={classes["text-container"]}>
        <p>
          Hiç kuşkusuz yaşam, ortaya çıkar çıkmaz kendisinin farkındaydı; ancak
          ne olduğunu bilmiyordu… madde değildi, ruh da değildi, ikisinin
          arasında bir şeydi: Yağmur sonrası göğü saran gökkuşağı, ya da
          yangında dans eden alev gibi… Ruhsuz maddenin utanmazca kendisini
          sezmeye başlamasıydı o. Kendisinin önüne geçemediği bir oluşumdu.
          Evrenin donuk iffetinde gizli ve ateşli bir karışımdı. Soğurmayla ve
          salgılamayla işleyen çalınmış ve şehvetli bir kirlilikti.
        </p>
        <p>
          Yaşam nedir? Kimse bilmez; ancak yaşamın ne olduğunu sorgulamadığımız
          her an boşa geçirilmiştir!
        </p>
        <div className={classes.buttons}>
          <Link to="/yasambilim">
            <Button color="#6ab165">YAŞAMBİLİM</Button>
          </Link>
          <Link to="/evrim">
            <Button color="#e7432b">EVRİM KURAMI</Button>
          </Link>
          <Link to="/denemeler">
            <Button color="#486769">DENEMELER</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
