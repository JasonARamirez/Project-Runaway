//
//  SignUpViewController.swift
//  Project Runaway
//
//  Created by DeQuan Burnside on 2/26/17.
//  Copyright © 2017 se329. All rights reserved.
//

import UIKit
import Alamofire
// MARK: -
// TODO: -
// FIXME: -

class SignUpViewController: UIViewController {
    
    @IBOutlet weak var firstNameTextField: UITextField!
    
    @IBOutlet weak var lastNameTextField: UITextField!
    @IBOutlet weak var usernameTextField: UITextField!
    
    @IBOutlet weak var emailTextField: UITextField!
    
    @IBOutlet weak var passwordTextField: UITextField!

    @IBOutlet weak var confirmPasswordTextField: UITextField!
    
    @IBOutlet weak var firstName: UITextField!
    @IBOutlet weak var lastNameField: UITextField!
    @IBAction func toLogInViewController(_ sender: Any) {
        // TODO: - perform segue
    }
    
    @IBOutlet weak var btn_box: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    override func shouldPerformSegue(withIdentifier identifier: String?, sender: Any?) -> Bool {
        if let ident = identifier {
            if ident == "login" {
                if checkFields() == true {
                    if callAlamo() != true {
                        let alert = UIAlertController(title: "Attention!", message: "Wrong password or Username", preferredStyle: UIAlertControllerStyle.alert)
                        alert.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default,handler: nil))
                        return false
                    }
                }
                else {
                    let alert = UIAlertController(title: "Attention!", message: "Please fill out all fields!", preferredStyle: UIAlertControllerStyle.alert)
                    alert.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default,handler: nil))
                    return false
                }
                
            }
        }
        return true
    }
    
    func md5(_ string: String) -> String {
        
        let context = UnsafeMutablePointer<CC_MD5_CTX>.allocate(capacity: 1)
        var digest = Array<UInt8>(repeating:0, count:Int(CC_MD5_DIGEST_LENGTH))
        CC_MD5_Init(context)
        CC_MD5_Update(context, string, CC_LONG(string.lengthOfBytes(using: String.Encoding.utf8)))
        CC_MD5_Final(&digest, context)
        context.deallocate(capacity: 1)
        var hexString = ""
        for byte in digest {
            hexString += String(format:"%02x", byte)
        }
        
        return hexString
    }
    
    func callAlamo() -> Bool{
        /*
         Use Alamofire to connect to our database through our Node.js API
         */
        //var success: Bool = false
        let api: String = "https://project-runaway.herokuapp.com/createUser"
        let newTodo = ["username": emailTextField.text!, "password": md5(passwordTextField.text!), "firstName": firstName.text!, "lastName": lastNameField.text!, "email":emailTextField.text!] as [String : Any]
        Alamofire.request(api, method: .post, parameters: newTodo, encoding: JSONEncoding.default)
            .responseJSON { response in
                debugPrint(response)
        }
        
        return false
       
    }
    
    func checkFields() -> Bool {
        if emailTextField.text != nil && passwordTextField.text != nil && firstName.text != nil && lastNameField.text != nil && confirmPasswordTextField.text != nil {
            if btn_box.isSelected == true {
                if passwordTextField.text == confirmPasswordTextField.text {
                    return true
                }
            }
        }
        return false
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    // MARK: - Checkbox Helper Function
    @IBAction func btn_box(sender: UIButton) {
        if (btn_box.isSelected == true)
        {
            btn_box.setBackgroundImage(UIImage(named: "Checked"), for: UIControlState.normal)
            
            btn_box.isSelected = false;
        }
        else
        {
            btn_box.setBackgroundImage(UIImage(named: "Unchecked"), for: UIControlState.normal)
            
            btn_box.isSelected = true;
        }
    }
    
    // TODO: - Sign Up Function
    // post, get response via a callback
    // if the entered email and username are you unique, create an account,
    // save this info and send to the next view controller via prepareForSegue below

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
