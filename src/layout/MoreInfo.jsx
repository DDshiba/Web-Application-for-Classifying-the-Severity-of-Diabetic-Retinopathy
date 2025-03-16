function MoreInfo() {
  return (
    <div className="hero bg-white min-h-screen flex items-center justify-center font-kanit">
      <div className="max-w-[1110px] w-full text-center ml-10 mr-10">
        <div>
          <h1 className="text-5xl font-bold mb-10 mt-20">
            รายละเอียดระดับความรุนแรงของภาวะเบาหวานขึ้นจอประสาทตา
          </h1>
          <div className="space-y-4 mb-20">
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-lg font-medium">
                ระดับที่ 1 ภาวะเบาหวานขึ้นจอประสาทตา
                ​ระยะที่ไม่มีการสร้างเส้นเลือดใหม่ <br />
                (Non-Proliferative Diabetic Retinopathy : No PDR)
              </div>
              <div className="collapse-content text-sm">
                <p>คือภาวะที่ไม่พบความผิดปกติของภาวะเบาหวานขึ้นจอประสาทตา</p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-medium">
                ระดับที่ 2 ภาวะเบาหวานขึ้นจอประสาทตา
                ระยะที่ไม่มีการสร้างเส้นเลือดใหม่ แบบเบา
                <br />
                (Mild Non-Proliferative Diabetic Retinopathy : Mild NPDR)
              </div>
              <div className="collapse-content text-sm">
                <p>
                  มักตรวจพบการโป่งพองของเส้นเลือดฝอย
                  ซึ่งจะเห็นเป็นจุดสีแดงขนาดเล็กที่จอประสาทตา
                  ซึ่งทำให้เกิดการรั่วซึมของไขมันและโปรตีนจากเส้นเลือดฝอยที่ถูกทำลายแล้วมาสะสมอยู่ในชั้นจอประสาทตา
                  (Hard Exudate) มีลักษณะจุดสีขาวหรือสีเหลืองเล็กๆ
                  รูปร่างไม่แน่นอน ขนาดไม่เท่ากัน มักพบหลายจุด
                  และสามารถกระจายอยู่ได้ทั่วบริเวณจอประสาทตา หรือจับตัวเป็นกลุ่ม
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-medium">
                ระดับที่ 3 ภาวะเบาหวานขึ้นจอประสาทตา
                ​ระยะที่ไม่มีการสร้างเส้นเลือดใหม่ ​แบบปานกลาง
                <br />
                (Moderate Non-Proliferative Diabetic Retinopathy : Moderate
                NPDR)
              </div>
              <div className="collapse-content text-sm">
                <p>
                  พบว่ามีการรั่วซึมของไขมันและโปรตีนจากเส้นเลือดฝอยที่ถูกทำลายแล้วมาสะสมอยู่ในชั้นจอประสาทตา
                  มากกว่าระดับที่ 2 Mild NPDR
                  และพบเลือดออกในชั้นจอประสาทตาซึ่งตำแหน่งที่เลือดออกคือชั้นด้านในของจอประสาทตา
                  (Flame-shaped hemorrhage) มีลักษณะสีแดงและขนาดใหญ่
                  รูปร่างคล้ายเปลวไฟและมักจะอยู่เดี่ยว ๆ ไม่ค่อยอยู่รวมกลุ่ม
                  หรือพบรอยของการขาดเลือดในชั้นจอประสาทตา (Cotton-wool spot)
                  มีลักษณะเป็นบริเวณสีขาว มีขนาดค่อนข้างใหญ่คล้ายก้อนสำลี
                  มักจะพบอยู่เดี่ยว ๆ ไม่รวมกลุ่ม
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-medium">
                ระดับที่ 4 ภาวะเบาหวานขึ้นจอประสาทตา
                ​ระยะที่ไม่มีการสร้างเส้นเลือดใหม่ ​แบบรุนแรง
                <br />
                (Severe Non-Proliferative Diabetic Retinopathy : Severe NPDR)
              </div>
              <div className="collapse-content text-sm text-left">
                <p>พบความผิดปกติเพียงหนึ่งอย่างดังต่อไปนี้ คือ:</p>
                <ul className="list-decimal list-inside space-y-2 mt-2">
                  <li>
                    เกิดการโป่งเป็นกระเปาะ (Venous Beading : VB)
                    โดยเส้นเลือดดำมีลักษณะโป่งพองเหมือนมีการบีบตัวและขยายออกเป็นลักษณะคล้ายลูกปัด
                    (beads) ซึ่งพบในบริเวณรอบนอกของจอประสาทตา
                  </li>
                  <li>
                    ความผิดปกติของหลอดเลือดแดงขนาดเล็กในชั้นในของจอประสาทตา
                    (Intraretinal microvascular abnormalitie : IRMA)
                    เป็นเส้นเลือดผิดปกติที่มาเชื่อมต่อระหว่างเส้นเลือดแดงย่อย
                    (Retinal arteriole) กับเส้นเลือดดำย่อย (Retinal venule)
                    ซึ่งมีลักษณะเป็นเส้นเลือดขนาดเล็ก
                    รูปร่างหยักหรือคดเคี้ยวและอยู่ในเนื้อของจอประสาทตา
                  </li>
                  <li>
                    การโป่งพองของเส้นเลือดฝอย หรือการมีเลือดออกในจอประสาทตา
                    (Retinal hemorrhage)
                    เกิดจากการรั่วของเลือดจากผนังของหลอดเลือดฝอยในจอประสาทตา
                    ซึ่งมีลักษณะเป็นจุดเลือดออกขนาดเล็ก (dot-hemorrhage)
                    เป็นเลือดออกในลักษณะจุดเล็ก ๆ คล้ายจุดหมึกบนกระดาษ
                    หรือจุดเลือดออกขนาดใหญ่ (blot-hemorrhage)
                    เป็นเลือดออกที่มีลักษณะเป็นจุดใหญ่หรือหย่อม ๆ
                    และกระจายอยู่ทั่วจอประสาทตา มากกว่า 20
                    จุดในแต่ละส่วนของจอประสาทตา โดยแบ่งพื้นที่จอประสาทตาเป็น 4
                    ส่วน มีจุดกึ่งกลางอยู่ที่จุดรับภาพศูนย์กลาง (Central fovea)
                  </li>
                  <li>
                    ไม่มีการสร้างเส้นเลือดใหม่ (Neovascularization) เกิดขึ้น
                  </li>
                </ul>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-medium">
                ระดับที่ 5 ภาวะเบาหวานขึ้นจอประสาทตา
                ​ระยะที่มีการสร้างเส้นเลือดใหม่
                <br />
                (Proliferative Diabetic Retinopathy : PDR){" "}
              </div>
              <div className="collapse-content text-sm text-left">
                <p>พบความผิดปกติเพียงหนึ่งอย่างดังต่อไปนี้ คือ:</p>
                <ul className="list-decimal list-inside space-y-2 mt-2">
                  <li>
                    มีการสร้างเส้นเลือดใหม่ที่ผิดปกติ (Neovascularization)
                    เป็นเส้นเลือดงอกใหม่ที่อ่อนแอและผิดปกติ
                    โดยสามารถแบ่งได้ตามตำแหน่งของเส้นเลือดที่งอกใหม่
                    เมื่อพบเส้นเลือดงอกใหม่บนผิวหรือบริเวณรอบ ๆ ของแผ่นประสาทตา
                    (Optic disc) เรียกว่า การสร้างเส้นเลือดใหม่ที่แผ่นจอประสาทตา
                    (Neovascularization of the disc : NVD)
                    เส้นเลือดจะมีลักษณะคดเคี้ยวและแตกแขนง
                    ซึ่งสามารถพบได้บนจอประสาทตา (Retina)
                    หรือบริเวณอื่นๆของจอประสาทตา เรียกว่า
                    การสร้างเส้นเลือดใหม่ที่อื่นในจอประสาทตา (Neovascularization
                    elsewhere :NVE) มีลักษณะคดเคี้ยวและแตกแขนง
                    อยู่เหนือจอประสาทตา
                  </li>
                  <li>
                    ภาวะเลือดออกในน้ำวุ้นตา (Vitreous Hemorrhage)
                    เมื่อเส้นเลือดใหม่แตก จะทำให้เกิดเลือดออกในน้ำวุ้นตา
                    (Vitreous humor) มีสีแดงและขอบเขตไม่ชัดเจน
                    ซึ่งสามารถทำให้การมองเห็นมัวหรือลดลงอย่างฉับพลัน
                  </li>
                  <li>
                    เลือดออกมาอยู่บริเวณด้านหน้าก่อนถึงจอประสาทตา (Preretinal
                    Hemorrhage)
                    คือการเลือดออกที่เกิดขึ้นในช่องว่างระหว่างผิวด้านหลังของจอประสาทตา
                    (Retina) และผิวด้านในของวุ้นตา (Vitreous humor)
                    เกิดขึ้นบริเวณรอบ ๆ จุดภาพชัด (Macula)
                    หรือที่บริเวณแผ่นประสาทตา (Optic disc) มีลักษณะเป็นระดับน้ำ
                    คล้ายรูปเรือ (Boat shape)
                  </li>
                  <li>
                    พบมีการเจริญของเนื้อเยื่อพังผืด (Fibrous proliferation)
                    ที่จอประสาทตาจะมักเกิดขึ้นที่เส้นประสาทตาและส่วนโค้งของหลอดเลือด
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MoreInfo;
